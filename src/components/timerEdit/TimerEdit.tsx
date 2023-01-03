import React, {ChangeEvent, useState} from 'react';
import {Button, ButtonGroup, Form, InputGroup, OverlayTrigger, Popover} from 'react-bootstrap';
import {getRandomId} from "../../utils/getRandomId";
import {getMsFromMinAndSec, msToHMS} from "../../utils/timeConverter";
import './TimerEdit.sass'
import {getTotalTime} from "../../utils/common";
import {FormattedMessage, IntlProvider} from 'react-intl';
import {LOCALES} from "../../translation/locales";
import getInitialLocale from "../../utils/lang/getInitialLocale";
import {messages} from "../../translation/messages";
import {cloneDeep} from "lodash";
import {useAppDispatch, useAppSelector} from "../../hooks/common/redux-hooks";
import {addTimer, onChangeEditData, saveEditData, toggleEditTimer} from "../../store/reducers/timer/timerReducer";

const TimerEdit = () => {

  const [currentLocale] =  useState(getInitialLocale());
  const dispatch = useAppDispatch();
  const currTimer = useAppSelector(state => state.timerReducer.currTimer)
  const timers = useAppSelector(state => state.timerReducer.timers)
  const editTimerData = useAppSelector(state => state.timerReducer.editTimerData)

  const saveFormData = () => {
      let updatedTimers = timers.map(t => {
          return t.id !== currTimer.id ? t : {...editTimerData, id: currTimer.id}
      });
      dispatch(toggleEditTimer(cloneDeep(currTimer)))
      dispatch(saveEditData({timer: {...editTimerData, id: currTimer.id}, timers: updatedTimers}))
  }

  const setTimerData = (e: ChangeEvent<HTMLInputElement>) => {

    let editableTimer = {...editTimerData};
    const target = e.target as HTMLInputElement;
    const value = target.type === 'number' ? +target.value : target.value;
    const name = target.name;
    editableTimer = {...editableTimer, [name]: value};

    editableTimer.roundTime =  getInputsTime(editableTimer, 'roundTime');
    editableTimer.restTime = getInputsTime(editableTimer, 'restTime');
    editableTimer.prepareTime = getInputsTime(editableTimer, 'prepareTime');
    editableTimer.warningTime = getInputsTime(editableTimer, 'warningTime');

    dispatch(onChangeEditData(editableTimer))
  }

  function getInputsTime(timer: {}, timeType: string) {

    type T = keyof typeof timer;

    const min = timer[timeType + 'Min' as T] || timer[timeType + 'Min' as T] === 0
    ? timer[timeType + 'Min' as T]
    : timer[timeType as T]['min'];

    const sec = timer[timeType + 'Sec' as T] || timer[timeType + 'Sec' as T] === 0
    ? timer[timeType + 'Sec' as T]
    : timer[timeType as T]['sec'];

    return {
      time: getMsFromMinAndSec(min, sec),
      min,
      sec
    };
  }

  const popover = (props: any) => (
      <Popover {...props}>
          <Popover.Header className="text-warning" as="h3"><FormattedMessage id='popoverHeaderText'/></Popover.Header>
          <Popover.Body>
              <FormattedMessage id='popoverBodyText' values={{br: <br />}}/>
          </Popover.Body>
      </Popover>
  );

  return (
    <IntlProvider messages={messages[currentLocale]} locale={currentLocale} defaultLocale={LOCALES.EN.code}>
      <Form className="edit-form d-flex flex-column">
        <Form.Label className="mb-3">
          <div className="mb-2"><FormattedMessage id='timerName'/>:</div>
          <Form.Control name='name' onChange={setTimerData} value={editTimerData.name} type="text"/>
        </Form.Label>

        <InputGroup className="edit-form__group mb-3">
          <InputGroup.Text className="rounds"><FormattedMessage id='rounds'/>:</InputGroup.Text>
          <Form.Control name='rounds'
                        onChange={setTimerData}
                        value={editTimerData.rounds}
                        type="number"
                        min="0"/>
        </InputGroup>
        <InputGroup className="edit-form__group mb-3">
          <InputGroup.Text><FormattedMessage id='roundTime'/></InputGroup.Text>
          <Form.Control name='roundTimeMin'
                        onChange={setTimerData}
                        value={editTimerData.roundTime.min}
                        type="number" min="0"/><span className="mx-1">:</span>
          <Form.Control name='roundTimeSec'
                        onChange={setTimerData}
                        value={editTimerData.roundTime.sec}
                        type="number" min="0"/>
        </InputGroup>
        <InputGroup className="edit-form__group mb-3">
          <InputGroup.Text className="group-item"><FormattedMessage id='restTime'/></InputGroup.Text>
          <Form.Control name='restTimeMin'
                        onChange={setTimerData}
                        value={editTimerData.restTime.min}
                        type="number" min="0"/><span className="mx-1">:</span>
          <Form.Control name='restTimeSec'
                        onChange={setTimerData}
                        value={editTimerData.restTime.sec}
                        type="number" min="0"/>
        </InputGroup>
        <InputGroup className="edit-form__group mb-3">
          <InputGroup.Text className="group-item"><FormattedMessage id='prepareTime'/></InputGroup.Text>
          <Form.Control
            name='prepareTimeMin'
            onChange={setTimerData}
            value={editTimerData.prepareTime.min}
            type="number" min="0"/><span className="mx-1">:</span>
          <Form.Control
            name='prepareTimeSec'
            onChange={setTimerData}
            value={editTimerData.prepareTime.sec}
            type="number" min="0"/>
        </InputGroup>
        <InputGroup className="edit-form__group mb-3">
          <InputGroup.Text><FormattedMessage id='warningTime'/></InputGroup.Text>
          <Form.Control name='warningTimeMin'
                        onChange={setTimerData}
                        value={editTimerData.warningTime.min}
                        type="number" min="0"/><span className="mx-1">:</span>
          <Form.Control name='warningTimeSec'
                        onChange={setTimerData}
                        value={editTimerData.warningTime.sec}
                        type="number" min="0"/>
        </InputGroup>
        <InputGroup className="edit-form__group inner-alerts mb-3">
          <InputGroup.Text className="inner-alerts__text mb-2 mb-sm-0">
            <FormattedMessage id='circleAlerts'/>
            <OverlayTrigger
              placement="top"
              overlay={popover}>
              <div className="popover-text ms-1 badge bg-warning">?</div>
            </OverlayTrigger>
          </InputGroup.Text>
          <Form.Control name='innerAlerts'
                        placeholder='10, 20, 30'
                        onChange={setTimerData}
                        value={editTimerData.innerAlerts}
                        className="inner-alerts__input"
                        type="text"
                        min="0"/>
        </InputGroup>


        <div className="edit-form__total text-center my-2">
          <FormattedMessage id='totalTime'/>: {msToHMS(getTotalTime(editTimerData))}
        </div>

        <ButtonGroup className="d-flex mt-2 control-btn">
          <Button variant="warning"
                  className="me-2"
                  onClick={() => {
                    dispatch(toggleEditTimer(cloneDeep(currTimer)))
                    dispatch(addTimer({...editTimerData, id: getRandomId()}))
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

export default TimerEdit;
