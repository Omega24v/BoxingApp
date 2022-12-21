import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  addTimer,
  deleteTimer,
  resetTimer,
  setTimer,
  startTimer,
  stopTimer,
  toggleEditTimer,
} from '../../store/actions/timerActions';
import { msToHMS } from '../../utils/timeConverter';
import IconClose from '../../icons/IconClose';
import IconEdit from '../../icons/IconEdit';
import './TimersList.sass';
import ConfirmAlert from '../UI/confirmAlert/ConfirmAlert';
import {FormattedMessage, IntlProvider} from 'react-intl';
import {messages} from "../../translation/messages";
import {LOCALES} from "../../translation/locales";
import getInitialLocale from "../../utils/lang/getInitialLocale";

const TimersList = (props) => {
  const [isDelete, setIsDelete] = useState(false);
  const [timerToDelete, setTimerToDelete] = useState(null);
  const [currentLocale, setCurrentLocale] =  useState(getInitialLocale());

  const selectTimer = (timer) => {
    props.stop();
    props.setTimer(timer);
    clearInterval(props.intervalId);
    props.resetTimer();
  };

  const showDeleteConfirm = (e, timer) => {
    e.stopPropagation();
    setIsDelete(true);
    setTimerToDelete(timer);
  };

  const deleteTimer = (e, timer) => {
    let filteredTimers = props.timers.filter((item) => item.id !== timer.id);
    if (timer.id === props.currTimer.id) {
      props.setTimer(filteredTimers[0]);
    }
    props.deleteTimer(filteredTimers);
    setIsDelete(false);
    setTimerToDelete(null);
  };

  return (
    <IntlProvider messages={messages[currentLocale]} locale={currentLocale} defaultLocale={LOCALES.EN.code}>
      <div className="d-flex flex-wrap gap-2 gap-md-3">
        {props.timers.map((timer, index) => (
          <div
            className={`timer-list flex-grow-1 flex-lg-grow-0 p-2 ${
              timer.id === props.currTimer.id ? 'active text-danger' : ''
            }`}
            onClick={() => selectTimer(timer)}
            key={timer.id}
          >
            <Row>
              <Col xs={10}>
                <div className="timer-list__item item-title mb-2">
                  {timer.name}
                </div>
                <div className="timer-list__item">
                  <i className="text-success me-1">&#9632;</i>
                  {timer.rounds} <FormattedMessage id='rounds'/> <FormattedMessage id='of'/> {msToHMS(timer.roundTime.time)}
                </div>
                <div className="timer-list__item">
                  <i className="text-primary me-1">&#9632;</i><FormattedMessage id='restTime'/>:{' '}
                  {msToHMS(timer.restTime.time)}
                </div>
                { timer.innerAlerts
                  ? <div className="timer-list__item">
                    <i className="text-danger">&#9632;</i> <FormattedMessage id='circleAlerts'/>:{' '}
                    <span className="no-wrap">{timer.innerAlerts}</span>
                  </div>
                  : ''
                }
              </Col>
              <Col xs={2} className="d-flex flex-column align-items-end">
              <span
                data-testid={`edit-timer-${index}`}
                className="mb-2"
                onClick={() => {
                  props.toggleEditTimer();
                  props.setTimer(timer);
                }}
              >
                <IconEdit />
              </span>
                {props.timers.length > 1 ? (
                  <span data-testid={`delete-timer-${index}`}
                    onClick={(e) => showDeleteConfirm(e, timer)}>
                  <IconClose />
                </span>
                ) : (
                  ''
                )}
              </Col>
            </Row>
          </div>
        ))}
        <ConfirmAlert
          show={isDelete}
          itemName={timerToDelete ? timerToDelete.name : ''}
          onHide={() => setIsDelete(false)}
          confirmAction={(e) => deleteTimer(e, timerToDelete)}
        />
      </div>
    </IntlProvider>
  );
};

function mapStateToProps(state) {
  return {
    currTimer: state.timerReducer.currTimer,
    timers: state.timerReducer.timers,
    intervalId: state.timerReducer.intervalId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    start: () => dispatch(startTimer()),
    stop: () => dispatch(stopTimer()),
    resetTimer: () => dispatch(resetTimer()),
    addTimer: (timer) => dispatch(addTimer(timer)),
    setTimer: (timer) => dispatch(setTimer(timer)),
    toggleEditTimer: () => dispatch(toggleEditTimer()),
    deleteTimer: (timers) => dispatch(deleteTimer(timers)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimersList);
