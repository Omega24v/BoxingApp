import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
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
import { FormattedMessage, IntlProvider } from 'react-intl';
import SoundSwitcher from "../../components/soundSwitcher/SoundSwitcher";
import ToggleTheme from "../../components/theme/ToggleTheme";
import LangSwitcher from '../langSwitcher/LangSwitcher';
import { LOCALES } from '../../translation/locales';
import { messages } from '../../translation/messages';
import getInitialLocale from "../../utils/lang/getInitialLocale";
import {
    countPhaseTime,
    pauseTimer,
    resetTimer,
    setCurrentPhase,
    setCurrentRound,
    setDefaultValues,
    setIntervalCount,
    setIntervalId,
    setPhaseTime,
    startTimer,
    stopTimer,
    toggleAddTimer,
    toggleEditTimer
} from "../../store/reducers/timer/timerReducer";

const Timer = props => {

    const [playBell1x] = useSound(bell1x);
    const [playBell3x] = useSound(bell3x);
    const [playWarning] = useSound(
            warning,
            { volume: 2 }
        );
    const [playInnerAlert] = useSound(innerAlert);
    const [innerAlerts, setInnerAlerts] = useState(null);

    const playSound = cb => {
        if (!cb) {return}
        return props.isSound ? cb() : null;
    }

    const stopResetAndTimer = () => {
        props.stop();
        clearInterval(props.intervalId);
        props.resetTimer();
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

    }, [props.intervalCount]);

    const handleTimer = () => {

        if (props.intervalId) {
            props.pause();
            clearInterval(props.intervalId);
            props.setIntervalId(0);
            return;
        }

        props.start();

        if (props.currentPhase === DEFAULT) {
            if (props.currTimer.prepareTime.time === 0) {
                startFight();
            } else {
                props.setCurrentPhase(PREPARE);
                props.setPhaseTime(props.currTimer.prepareTime.time);
            }
        }

        const newIntervalId = setInterval(() => {
            props.setIntervalCount(1000);
            props.countPhaseTime(1000);
        }, 1000);

        props.setIntervalId(newIntervalId);
    }

    function preparationFinished() {
        return props.currentPhase === PREPARE && props.intervalCount === props.currTimer.prepareTime.time
    }

    function startFight() {
        setInnerAlerts(getInnerAlerts() ? getFilteredAndMapInnerAlerts() : '');
        props.setIntervalCount(0);
        props.setPhaseTime(props.currTimer.roundTime.time);
        props.setCurrentPhase(ROUND);
        playSound(playBell1x);
    }

    function isRoundPhase() {
        return props.currentPhase === ROUND;
    }

    function isLastRound() {
        return props.currentRound === props.currTimer.rounds;
    }

    function startRest() {
        props.setIntervalCount(0);
        props.setPhaseTime(props.currTimer.restTime.time);
        props.setCurrentPhase(REST);
        playSound(playBell3x);
    }

    function startRound() {
        props.setIntervalCount(0);
        props.setPhaseTime(props.currTimer.roundTime.time);
        props.setCurrentPhase(ROUND);
        props.setCurrentRound();
        resetInnerAlerts();
        playSound(playBell1x);
    }

    function stopFight() {
        setTimeout(() => {
            stopResetAndTimer();
        }, 0);
    }

    function isWarningPhase() {
        const isWarningTime = props.intervalCount === props.currTimer.roundTime.time - props.currTimer.warningTime.time;
        const isWarningSet = props.currTimer.warningTime.time !== 0;
        return isRoundPhase() && isWarningTime && isWarningSet;
    }

    function startWarning() {
        playSound(playWarning);
        props.setCurrentPhase(WARNING);
    }

    function isRestFinished() {
        const isRestPhase = props.currentPhase === REST;
        const isRestFinished = props.intervalCount === props.currTimer.restTime.time;
        const isRestNotSet = props.currTimer.restTime.time === 0;
        return isRestPhase && (isRestFinished || isRestNotSet);
    }

    function warningFinished() {
        const isWarningPhase = props.currentPhase === WARNING;
        const isRoundFinished = props.intervalCount === props.currTimer.roundTime.time;
        return isWarningPhase && isRoundFinished;
    }

    function isLastRoundSecond() {
        return props.intervalCount === props.currTimer.roundTime.time;
    }

    function roundFinished() {
        return isRoundPhase() && props.currTimer.roundTime.time === 0
    }

    function getFilteredAndMapInnerAlerts() {
        return getInnerAlerts().filter(item => item && +item > 0).map(item => {
            return {time: parseInt(item, 10), isActivated: false}
        })
    }

    function isInnerAlerts(alert, prevAlertTime) {
        return props.intervalCount !== 0
            && (props.currentPhase === ROUND || props.currentPhase === WARNING)
            && !alert.isActivated
            && (props.intervalCount / 1000) % (alert.time + (prevAlertTime || 0)) === 0
    }

    function getInnerAlerts() {
        return props.currTimer.innerAlerts ? props.currTimer.innerAlerts.split(',') : null;
    }

    function resetInnerAlerts() {
        if (!innerAlerts) {return}
        let mapAlerts = innerAlerts.map(item => {
            return {...item, isActivated: false}
        });
        setInnerAlerts(mapAlerts);
    }

    function isInnerAlertsCircleFinished() {
        return innerAlerts.filter(alert => {
            return !alert.isActivated;
        }).length === 0;
    }

    function playInnerAlertSound() {
        if (!innerAlerts) {return}
        innerAlerts.reduce((prevAlertTime, alert) => {
            if (isInnerAlerts(alert, prevAlertTime)) {
                alert.isActivated = true;
                playSound(playInnerAlert);
            }
            return innerAlerts.length > 1 ? alert.time + prevAlertTime : 0;
        }, 0);
    }

    const [currentLocale, setCurrentLocale] =  useState(getInitialLocale());
    const defaultLoc = LOCALES.EN.code;

    return (
        <IntlProvider messages={messages[currentLocale]} locale={currentLocale} defaultLocale={defaultLoc}>
            <Row className="mb-2">
                <Col xs={7} md={10}><h2 className="timer-title">{props.currTimer.name}</h2></Col>
                <Col xs={5} md={2} className="d-flex align-items-center justify-content-end">
                    <LangSwitcher currentLocale={currentLocale} setCurrentLocale={setCurrentLocale} defaultLoc={defaultLoc} />
                    <ToggleTheme/>
                    <SoundSwitcher/>
                </Col>
            </Row>
            <Row className="mb-2 mb-sm-4">
                <Col md={5} className="current-round-col mb-md-0 mb-2">
                    <div className="timer-big current-round">
                        <span className="timer-big__text">
                            <FormattedMessage id='currentRound'/>
                        </span>
                        <span className="timer-big__count">
                            { props.currentRound > 9 ? props.currentRound : `0${props.currentRound}`}
                        </span>
                        <span className="timer-big__text"><FormattedMessage id='of'/> {props.currTimer.rounds} <FormattedMessage id='rounds'/></span>
                    </div>
                </Col>
                <Col md={7}>
                    <div className={'timer-big full-time full-time' + getPhaseColor(props.currentPhase)}>
                        <span className="timer-big__text">
                            { props.currentPhase === DEFAULT
                                ? <FormattedMessage id='totalTime'/>
                                : <FormattedMessage id={PHASES[props.currentPhase].toLowerCase()}/>
                            }
                        </span>
                        <span className="timer-big__count">
                            { props.currentPhase === DEFAULT
                                ? msToHMS(getTotalTime(props.currTimer))
                                : msToHMS(props.phaseTime)
                            }
                        </span>
                    </div>
                </Col>
            </Row>
            <Row md={12} className="d-none d-md-block mb-4">
                <Col className="d-flex justify-content-between">
                    <TimerInfo type='total' label={<FormattedMessage id='totalTime'/>} val={props.currTimer}/>
                    <TimerInfo type='warning' label={<FormattedMessage id='prepareTime'/>} val={props.currTimer.prepareTime.time}/>
                    <TimerInfo type='info' label={<FormattedMessage id='roundTime'/>} val={props.currTimer.roundTime.time}/>
                    <TimerInfo type='primary' label={<FormattedMessage id='restTime'/>} val={props.currTimer.restTime.time}/>
                    <TimerInfo type='warning' label={<FormattedMessage id='warningTime'/>} val={props.currTimer.warningTime.time}/>
                </Col>
            </Row>
            <Row className="mb-2 mb-sm-4">
                <Col className="d-flex justify-content-center">
                    <ButtonGroup className="control-btn" aria-label="timer buttons">
                        {props.isRunning
                            ?
                            <Button variant="danger"
                                    className="me-2"
                                    onClick={stopResetAndTimer}>
                                <FormattedMessage id='stop'/>
                            </Button>
                            :
                            ''
                        }
                        <Button variant="success" className="me-2 btn-start" onClick={handleTimer}>
                            {props.isRunning ? <FormattedMessage id='pause'/> : <FormattedMessage id='start'/>}
                        </Button>
                        <Button variant="warning" onClick={() => {props.toggleEditTimer()}}><FormattedMessage id='editAdd'/></Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TimersList/>
                </Col>
            </Row>

            <ModalEdit
                show={props.isEdit}
                timerName={props.currTimer.name}
                onHide={props.toggleEditTimer}
            />
        </IntlProvider>
    );
};

function mapStateToProps(state) {
    return {
        isEdit: state.timerReducer.isEdit,
        isRunning: state.timerReducer.isRunning,
        isSound: state.timerReducer.isSound,
        currTimer: state.timerReducer.currTimer,
        currentRound: state.timerReducer.currentRound,
        currentPhase: state.timerReducer.currentPhase,
        phaseTime: state.timerReducer.phaseTime,
        fullTime: state.timerReducer.fullTime,
        intervalCount: state.timerReducer.intervalCount,
        intervalId: state.timerReducer.intervalId,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        start: () => dispatch(startTimer()),
        pause: () => dispatch(pauseTimer()),
        stop: () => dispatch(stopTimer()),
        toggleEditTimer: () => dispatch(toggleEditTimer()),
        toggleAddTimer: () => dispatch(toggleAddTimer()),
        setDefaultValues: () => dispatch(setDefaultValues()),
        resetTimer: () => dispatch(resetTimer()),
        setIntervalCount: count => dispatch(setIntervalCount(count)),
        setIntervalId: id => dispatch(setIntervalId(id)),
        setPhaseTime: time => dispatch(setPhaseTime(time)),
        countPhaseTime: time => dispatch(countPhaseTime(time)),
        setCurrentPhase: phase => dispatch(setCurrentPhase(phase)),
        setCurrentRound: () => dispatch(setCurrentRound()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
