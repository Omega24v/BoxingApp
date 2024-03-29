import React, {useState} from 'react';
import {ButtonGroup, Button, Form, InputGroup, OverlayTrigger, Popover} from 'react-bootstrap';
import {connect} from "react-redux";
import {getRandomId} from "../../utils/getRandomId";
import {getMsFromMinAndSec, msToHMS} from "../../utils/timeConverter";
import './TimerEdit.sass'
import {getTotalTime} from "../../utils/common";
import {FormattedMessage, IntlProvider} from 'react-intl';
import {LOCALES} from "../../translation/locales";
import getInitialLocale from "../../utils/lang/getInitialLocale";
import {messages} from "../../translation/messages";
import {
  addTimer,
  onChangeEditData,
  saveEditData,
  startTimer,
  toggleEditTimer
} from "../../store/reducers/timer/timerReducer";

const TimerEdit = props => {

  const [currentLocale, setCurrentLocale] =  useState(getInitialLocale());

    const saveFormData = () => {
        let updatedTimers = props.timers.map(t => {
            return t.id !== props.currTimer.id ? t : {...props.editTimerData, id: props.currTimer.id}
        });
        props.toggleEditTimer();
        props.saveEditData({timer: {...props.editTimerData, id: props.currTimer.id}, timers: updatedTimers});
    }

    const setTimerData = e => {

        let editableTimer = {...props.editTimerData}
        const target = e.target;
        const value = target.type === 'number' ? +target.value : target.value;
        const name = target.name;
        editableTimer = {...editableTimer, [name]: value};

        editableTimer.roundTime.time = getInputsTime(editableTimer, 'roundTime');
        editableTimer.restTime.time = getInputsTime(editableTimer, 'restTime');
        editableTimer.prepareTime.time = getInputsTime(editableTimer, 'prepareTime');
        editableTimer.warningTime.time = getInputsTime(editableTimer, 'warningTime');

        props.onChangeEditData(editableTimer);
    }

    const popover = (props) => (
        <Popover {...props}>
            <Popover.Header className="text-warning" as="h3"><FormattedMessage id='popoverHeaderText'/></Popover.Header>
            <Popover.Body>
                <FormattedMessage id='popoverBodyText' values={{br: <br />}}/>
            </Popover.Body>
        </Popover>
    );

    function getInputsTime(timer, timeType) {
        const min = timer[timeType + 'Min'] || timer[timeType + 'Min'] === 0 ? timer[timeType + 'Min'] : timer[timeType].min;
        const sec = timer[timeType + 'Sec'] || timer[timeType + 'Sec'] === 0 ? timer[timeType + 'Sec'] : timer[timeType].sec;
        return getMsFromMinAndSec(min, sec);
    }

    return (
      <IntlProvider messages={messages[currentLocale]} locale={currentLocale} defaultLocale={LOCALES.EN.code}>
        <Form className="edit-form d-flex flex-column">
          <Form.Label className="mb-3">
            <div className="mb-2"><FormattedMessage id='timerName'/>:</div>
            <Form.Control name='name' onChange={setTimerData} value={props.editTimerData.name} type="text"/>
          </Form.Label>

          <InputGroup className="edit-form__group mb-3">
            <InputGroup.Text className="rounds"><FormattedMessage id='rounds'/>:</InputGroup.Text>
            <Form.Control name='rounds'
                          onChange={setTimerData}
                          value={props.editTimerData.rounds}
                          type="number"
                          min="0"/>
          </InputGroup>
          <InputGroup className="edit-form__group mb-3">
            <InputGroup.Text><FormattedMessage id='roundTime'/></InputGroup.Text>
            <Form.Control name='roundTimeMin'
                          onChange={setTimerData}
                          value={props.editTimerData.roundTime.min}
                          type="number" min="0"/><span className="mx-1">:</span>
            <Form.Control name='roundTimeSec'
                          onChange={setTimerData}
                          value={props.editTimerData.roundTime.sec}
                          type="number" min="0"/>
          </InputGroup>
          <InputGroup className="edit-form__group mb-3">
            <InputGroup.Text className="group-item"><FormattedMessage id='restTime'/></InputGroup.Text>
            <Form.Control name='restTimeMin'
                          onChange={setTimerData}
                          value={props.editTimerData.restTime.min}
                          type="number" min="0"/><span className="mx-1">:</span>
            <Form.Control name='restTimeSec'
                          onChange={setTimerData}
                          value={props.editTimerData.restTime.sec}
                          type="number" min="0"/>
          </InputGroup>
          <InputGroup className="edit-form__group mb-3">
            <InputGroup.Text className="group-item"><FormattedMessage id='prepareTime'/></InputGroup.Text>
            <Form.Control
              name='prepareTimeMin'
              onChange={setTimerData}
              value={props.editTimerData.prepareTime.min}
              type="number" min="0"/><span className="mx-1">:</span>
            <Form.Control
              name='prepareTimeSec'
              onChange={setTimerData}
              value={props.editTimerData.prepareTime.sec}
              type="number" min="0"/>
          </InputGroup>
          <InputGroup className="edit-form__group mb-3">
            <InputGroup.Text><FormattedMessage id='warningTime'/></InputGroup.Text>
            <Form.Control name='warningTimeMin'
                          onChange={setTimerData}
                          value={props.editTimerData.warningTime.min}
                          type="number" min="0"/><span className="mx-1">:</span>
            <Form.Control name='warningTimeSec'
                          onChange={setTimerData}
                          value={props.editTimerData.warningTime.sec}
                          type="number" min="0"/>
          </InputGroup>
          <InputGroup className="edit-form__group inner-alerts mb-3">
            <InputGroup.Text className="inner-alerts__text mb-2 mb-sm-0">
              <FormattedMessage id='circleAlerts'/>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250 }}
                overlay={popover}>
                <div className="popover-text ms-1 badge bg-warning">?</div>
              </OverlayTrigger>
            </InputGroup.Text>
            <Form.Control name='innerAlerts'
                          placeholder='10, 20, 30'
                          onChange={setTimerData}
                          value={props.editTimerData.innerAlerts}
                          className="inner-alerts__input"
                          type="text"
                          min="0"/>
          </InputGroup>


          <div className="edit-form__total text-center my-2">
            <FormattedMessage id='totalTime'/>: {msToHMS(getTotalTime(props.editTimerData))}
          </div>

          <ButtonGroup className="d-flex mt-2 control-btn">
            <Button variant="warning"
                    className="me-2"
                    onClick={() => {
                      props.toggleEditTimer();
                      props.addTimer({...props.editTimerData, id: getRandomId()});
                    }}>
              <FormattedMessage id='saveAsNewTimer'/>
            </Button>
            <Button variant="success" onClick={saveFormData}>
              <FormattedMessage id='saveSettings'/>
            </Button>
          </ButtonGroup>
        </Form>
      </IntlProvider>

    );
};

function mapStateToProps(state) {
    return {
        currTimer: state.timerReducer.currTimer,
        timers: state.timerReducer.timers,
        isEdit: state.timerReducer.isEdit,
        editTimerData: state.timerReducer.editTimerData,
        fullTime: state.timerReducer.fullTime,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        start: () => dispatch(startTimer()),
        addTimer: timer => dispatch(addTimer(timer)),
        saveEditData: timer => dispatch(saveEditData(timer)),
        onChangeEditData: data => dispatch(onChangeEditData(data)),
        toggleEditTimer: () => dispatch(toggleEditTimer()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimerEdit);
