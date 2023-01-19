import React, {useEffect, useState} from 'react';
import {getPhaseColor, getTotalTime} from "../../utils/common";
import {Button, ButtonGroup, Col, Row} from 'react-bootstrap';
import {DEFAULT, PHASES, PREPARE, REST, ROUND, WARNING} from "../../constatns/timerDefaultValues";
import {msToHMS} from "../../utils/timeConverter";
import ModalEdit from '../modals/ModalEdit';
import TimersList from '../timersList/TimersList';
import './Timer.sass';
import useSound from 'use-sound';
import bell1x from '../../sounds/bell-1x.mp3';
import bell3x from '../../sounds/bell-3x.mp3';
import warning from '../../sounds/warning.mp3';
import innerAlert from '../../sounds/innerAlert.mp3';
import TimerInfo from "../timerInfo/TimerInfo";
import {FormattedMessage, IntlProvider} from 'react-intl';
import SoundSwitcher from "../../components/soundSwitcher/SoundSwitcher";
import ToggleTheme from "../../components/theme/ToggleTheme";
import LangSwitcher from '../langSwitcher/LangSwitcher';
import {messages} from '../../translation/messages';
import {
    countPhaseTime,
    pauseTimer,
    resetTimer,
    setCurrentPhase,
    setCurrentRound,
    setIntervalCount,
    setIntervalId,
    setPhaseTime,
    startTimer,
    stopTimer,
    toggleEditTimer
} from "../../store/reducers/timer/timerReducer";
import {DEFAULT_LOCALE} from "../../translation/locales";
import {cloneDeep} from "lodash";
import {useAppDispatch, useAppSelector} from "../../hooks/common/redux-hooks";
import {Alert} from "../../dataStructure";

const Timer = () => {

    const [playBell1x] = useSound(bell1x);
    const [playBell3x] = useSound(bell3x);
    const [playWarning] = useSound(
            warning,
            { volume: 2 }
        );
    const [playInnerAlert] = useSound(innerAlert);
    const [innerAlerts, setInnerAlerts] = useState<Alert[] | null>(null);
    const dispatch = useAppDispatch();
    const isEdit = useAppSelector(state => state.timerReducer.isEdit);
    const isRunning = useAppSelector(state => state.timerReducer.isRunning);
    const isSound = useAppSelector(state => state.timerReducer.isSound);
    const currTimer = useAppSelector(state => state.timerReducer.currTimer);
    const currentRound = useAppSelector(state => state.timerReducer.currentRound);
    const currentPhase = useAppSelector(state => state.timerReducer.currentPhase);
    const phaseTime = useAppSelector(state => state.timerReducer.phaseTime);
    const intervalCount = useAppSelector(state => state.timerReducer.intervalCount);
    const intervalId = useAppSelector(state => state.timerReducer.intervalId);
    const locale = useAppSelector(state => state.timerReducer.locale);


    const playSound = (cb: any) => {
        if (!cb) {return}
        return isSound ? cb() : null;
    }

    const stopResetAndTimer = (): void => {
        dispatch(stopTimer());
        clearInterval(intervalId);
        dispatch(resetTimer())
    }

    useEffect(() => {

        if (innerAlerts) {
            if (isInnerAlertsCircleFinished()) {
                resetInnerAlerts();
            }
            if (!isLastRoundSecond()) {
                playInnerAlertSound();
            }
        }

        if (preparationFinished()) {
            startFight();
        } else if (isWarningPhase()) {
            startWarning();
        } else if (roundFinished() || warningFinished()) {
            if (isLastRound()) {
                stopFight();
            } else {
                startRest();
            }
        } else if (isRestFinished()) {
            startRound();
        }

    }, [intervalCount]);

    const handleTimer = (): void => {

        if (intervalId) {
            dispatch(pauseTimer());
            clearInterval(intervalId);
            dispatch(setIntervalId(0));
            return;
        }

        dispatch(startTimer());

        if (currentPhase === DEFAULT) {
            if (currTimer.prepareTime.time === 0) {
                startFight();
            } else {
                dispatch(setCurrentPhase(PREPARE));
                dispatch(setPhaseTime(currTimer.prepareTime.time));
            }
        }

        const newIntervalId: number = window.setInterval(() => {
            dispatch(setIntervalCount(1000));
            dispatch(countPhaseTime(1000));
        }, 1000);

        dispatch(setIntervalId(newIntervalId));
    }

    function preparationFinished(): boolean {
        return currentPhase === PREPARE && intervalCount === currTimer.prepareTime.time
    }

    function startFight(): void {
        setInnerAlerts(getInnerAlerts() ? getFilteredAndMapInnerAlerts() : null);
        dispatch(setIntervalCount(0));
        dispatch(setPhaseTime(currTimer.roundTime.time));
        dispatch(setCurrentPhase(ROUND));
        playSound(playBell1x);
    }

    function isRoundPhase(): boolean {
        return currentPhase === ROUND;
    }

    function isLastRound(): boolean {
        return currentRound === currTimer.rounds;
    }

    function startRest(): void {
        dispatch(setIntervalCount(0));
        dispatch(setPhaseTime(currTimer.restTime.time));
        dispatch(setCurrentPhase(REST));
        playSound(playBell3x);
    }

    function startRound(): void {
        dispatch(setIntervalCount(0));
        dispatch(setPhaseTime(currTimer.roundTime.time));
        dispatch(setCurrentPhase(ROUND));
        dispatch(setCurrentRound());
        resetInnerAlerts();
        playSound(playBell1x);
    }

    function stopFight(): void {
        setTimeout(() => {
            stopResetAndTimer();
        }, 0);
    }

    function isWarningPhase(): boolean {
        const isWarningTime = intervalCount === currTimer.roundTime.time - currTimer.warningTime.time;
        const isWarningSet = currTimer.warningTime.time !== 0;
        return isRoundPhase() && isWarningTime && isWarningSet;
    }

    function startWarning(): void {
        playSound(playWarning);
        dispatch(setCurrentPhase(WARNING));
    }

    function isRestFinished(): boolean {
        const isRestPhase = currentPhase === REST;
        const isRestFinished = intervalCount === currTimer.restTime.time;
        const isRestNotSet = currTimer.restTime.time === 0;
        return isRestPhase && (isRestFinished || isRestNotSet);
    }

    function warningFinished(): boolean {
        const isWarningPhase = currentPhase === WARNING;
        const isRoundFinished = intervalCount === currTimer.roundTime.time;
        return isWarningPhase && isRoundFinished;
    }

    function isLastRoundSecond(): boolean {
        return intervalCount === currTimer.roundTime.time;
    }

    function roundFinished(): boolean {
        return isRoundPhase() && currTimer.roundTime.time === 0
    }

    function getFilteredAndMapInnerAlerts(): Alert[] | null {
        const alerts = getInnerAlerts();
        if (!alerts) return null;
        return alerts.filter(item => item && +item > 0).map(item => {
            return {time: parseInt(item, 10), isActivated: false}
        })
    }

    function isInnerAlerts(alert: Alert, prevAlertTime: number): boolean {
        return intervalCount !== 0
            && (currentPhase === ROUND || currentPhase === WARNING)
            && !alert.isActivated
            && (intervalCount / 1000) % (alert.time + (prevAlertTime || 0)) === 0
    }

    function getInnerAlerts(): string[] | null {
        return currTimer.innerAlerts ? currTimer.innerAlerts.split(',') : null;
    }

    function resetInnerAlerts(): void {
        if (!innerAlerts) {return}
        let mapAlerts: Alert[] = innerAlerts.map(item => {
            return {...item as Alert, isActivated: false}
        });
        setInnerAlerts(mapAlerts);
    }

    function isInnerAlertsCircleFinished(): boolean {
        if (!innerAlerts) return false;
        return innerAlerts.filter((alert: Alert) => {
            return !alert.isActivated;
        }).length === 0;
    }

    function playInnerAlertSound(): void {
        if (!innerAlerts) {return}
        innerAlerts.reduce((prevAlertTime: number, alert: Alert) => {
            if (isInnerAlerts(alert, prevAlertTime)) {
                alert.isActivated = true;
                playSound(playInnerAlert);
            }
            return innerAlerts.length > 1 ? alert.time + prevAlertTime : 0;
        }, 0);
    }

    return (
        <IntlProvider messages={messages[locale]} locale={locale} defaultLocale={DEFAULT_LOCALE}>
            <Row className="mb-2">
                <Col xs={7} md={10}><h2 className="timer-title">{currTimer.name}</h2></Col>
                <Col xs={5} md={2} className="d-flex align-items-center justify-content-end">
                    <LangSwitcher />
                    <ToggleTheme/>
                    <SoundSwitcher/>
                </Col>
            </Row>
            <Row className="mb-2 mb-sm-4">
                <Col data-testid='current-round-col' md={5} className="current-round-col mb-md-0 mb-2">
                    <div className="timer-big current-round">
                        <span className="timer-big__text">
                            <FormattedMessage id='currentRound'/>
                        </span>
                        <span className="timer-big__count">
                            { currentRound > 9 ? currentRound : `0${currentRound}`}
                        </span>
                        <span className="timer-big__text"><FormattedMessage id='of'/> {currTimer.rounds} <FormattedMessage id='rounds'/></span>
                    </div>
                </Col>
                <Col md={7}>
                    <div data-testid='timer-big-full-time'
                        className={'timer-big full-time full-time' + getPhaseColor(currentPhase)}>
                        <span className="timer-big__text">
                            { currentPhase === DEFAULT
                                ? <FormattedMessage id='totalTime'/>
                                : <FormattedMessage id={PHASES[currentPhase as keyof typeof PHASES].toLowerCase()}/>
                            }
                        </span>
                        <span className="timer-big__count">
                            { currentPhase === DEFAULT
                                ? msToHMS(getTotalTime(currTimer))
                                : msToHMS(phaseTime)
                            }
                        </span>
                    </div>
                </Col>
            </Row>
            <Row md={12} className="d-none d-md-block mb-4">
                <Col className="d-flex justify-content-between">
                    <TimerInfo type='total' label={<FormattedMessage id='totalTime'/>} timer={currTimer}/>
                    <TimerInfo type='warning' label={<FormattedMessage id='prepareTime'/>} time={currTimer.prepareTime.time}/>
                    <TimerInfo type='info' label={<FormattedMessage id='roundTime'/>} time={currTimer.roundTime.time}/>
                    <TimerInfo type='primary' label={<FormattedMessage id='restTime'/>} time={currTimer.restTime.time}/>
                    <TimerInfo type='warning' label={<FormattedMessage id='warningTime'/>} time={currTimer.warningTime.time}/>
                </Col>
            </Row>
            <Row className="mb-2 mb-sm-4">
                <Col className="d-flex justify-content-center">
                    <ButtonGroup className="control-btn" aria-label="timer buttons">
                        {isRunning
                            ?
                            <Button variant="danger"
                                    className="me-2"
                                    onClick={stopResetAndTimer}>
                                <FormattedMessage id='stop'/>
                            </Button>
                            :
                            ''
                        }
                        <Button data-testid='btn-start' variant="success" className="me-2 btn-start" onClick={handleTimer}>
                            {isRunning ? <FormattedMessage id='pause'/> : <FormattedMessage id='start'/>}
                        </Button>
                        <Button data-testid="openEditAddModalBtn" variant="warning" onClick={() => {dispatch(toggleEditTimer(cloneDeep(currTimer)))}}><FormattedMessage id='editAdd'/></Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TimersList />
                </Col>
            </Row>

            <ModalEdit
                show={isEdit}
                timerName={currTimer.name}
                onHide={() => dispatch(toggleEditTimer(cloneDeep(currTimer)))}
            />
        </IntlProvider>
    );
};

export default Timer;
