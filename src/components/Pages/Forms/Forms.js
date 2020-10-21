import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { createRecord, updateRecords } from '../../../Redux/rootForm/rootFormActions';
import './Forms.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Forms(props) {
    const listCss = { cursor: 'pointer', listStyle: 'none', margin: '3px', padding: '10px', border: '1px dashed #ddd' }
    const [formList, setFormList] = useState([]);
    var [formrender, setFormRender] = useState([]);
    const [selected, setSelected] = useState('');
    const [showButton, setShowButton] = useState(false);
    const dispatch = useDispatch();
    const forms = useSelector(state => state.form.forms);
    const [prevId, setPrevId] = useState(props.location?.state?.id);

    useEffect(() => {
        let tempArr = Object.keys(forms);
        setFormList(tempArr);
        if (prevId && prevId !== undefined) {
            let tempVal = prevId?.id?.split('_')[1];
            getSelectedForm(tempVal)
        } else if (prevId === undefined) {
            setPrevId('');
            setFormRender([]);
        }
    }, [forms])

    function getSelectedForm(value) {
        setShowButton(true);
        let temp = JSON.parse(JSON.stringify(forms[value]));
        if (prevId && temp && temp['metaData'].length) {
            for (let k = 0; k < temp['metaData'].length; k++) {
                let field = temp['metaData'][k]
                field['value'] = prevId[field['label']]
            }
        }
        setSelected(value);
        setFormRender(temp);
    }

    function saveRecord() {
        let tempRecord = {};
        let uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
        for (let i = 0; i < formrender.metaData.length; i++) {
            let field = formrender.metaData[i];
            tempRecord[field['label']] = field['value'];
        }
        tempRecord['templateType'] = selected;
        tempRecord['id'] = uniqueId + '_' + selected;
        dispatch(createRecord(tempRecord));
        for (let i = 0; i < formrender.metaData.length; i++) {
            formrender.metaData[i]['value'] = '';
        }
        setFormRender([]);
        setShowButton(false);
        showToast('Record created succesfully');
    }


    function showToast(args) {
        toast.success(args, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
    }

    function updateRecord() {
        let tempObj = {};
        for (let i = 0; i < formrender.metaData.length; i++) {
            let field = formrender.metaData[i];
            tempObj[field['label']] = field['value'];
        }
        tempObj['templateType'] = selected;
        tempObj['id'] = prevId.id
        dispatch(updateRecords(tempObj));
        for (let i = 0; i < formrender.metaData.length; i++) {
            formrender.metaData[i]['value'] = '';
        }
        setPrevId('');
        setFormRender([]);
        setShowButton(false);
        showToast('Record updated succesfully');
    }

    function getValues(event, index) {
        let value = event
        formrender.metaData[index]['value'] = value
    }

    function EmailTag(props) {
        return (
            <Form.Group controlId="formBasicEmail">
                <Form.Label>{props?.data?.displayLabel}</Form.Label>
                <Form.Control type="email" placeholder="Enter email" defaultValue={props?.data?.value || ''} onChange={(e) => getValues(e.target.value, props.index)} />
                <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>
        )
    }
    function TextTag(props) {
        return (
            <Form.Group controlId="formBasicEmail">
                <Form.Label>{props?.data?.displayLabel}</Form.Label>
                <Form.Control type="text" placeholder="Enter Text" defaultValue={props?.data?.value || ''} onChange={(e) => getValues(e.target.value, props.index)} />
            </Form.Group>
        )
    }
    function NumberTag(props) {
        return (
            <Form.Group controlId="formBasicEmail">
                <Form.Label>{props?.data?.displayLabel}</Form.Label>
                <Form.Control type="number" placeholder="12345...." defaultValue={props?.data?.value || ''} onChange={(e) => getValues(e.target.value, props.index)} />
            </Form.Group>
        )
    }
    function CheckBox(props) {
        return (
            <Form.Group controlId="formBasicCheckbox">
                <Form.Label>{props?.data?.displayLabel}</Form.Label>
                <Form.Check type="checkbox" label="Check me out" checked={props?.data?.value} onChange={(e) => getValues(e.target.checked, props.index)} />
            </Form.Group>
        )
    }
    function TextArea(props) {
        return (
            <Form.Group controlId="formBasicTextArea">
                <Form.Label>{props?.data?.displayLabel}</Form.Label>
                <textarea className="form-control" rows="3" col="3" id="comment" defaultValue={props?.data?.value || ''} onChange={(e) => getValues(e.target.value, props.index)} ></textarea>
            </Form.Group>
        )
    }
    function DateArea(props) {
        return (
            <Form.Group controlId="formBasicDate">
                <Form.Label>{props?.data?.displayLabel}</Form.Label>
                <Form.Check type="date" defaultValue={props?.data?.value || ''} onChange={(e) => getValues(e.target.value, props.index)} />
            </Form.Group>
        )
    }

    return (
        <>
            <div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Row>
                    <Col xs={12} md={6} className="border-right" style={{ height: '100vh', overflowY: 'auto' }}>
                        <h6 className="text-muted"> Forms List</h6>
                        <br />
                        {formList.map((item, index) => (
                            <ListGroup.Item key={index} style={listCss} onClick={() => getSelectedForm(item)} action>{item}</ListGroup.Item>
                        ))}
                    </Col>
                    <Col xs={12} md={6}>
                        <h6 className="text-muted">Selected Form</h6>
                        {showButton && <div className="float-right">
                            <Button variant="success" size="sm" onClick={prevId ? updateRecord : saveRecord}>
                                <FontAwesomeIcon icon={faPlusCircle} /> {prevId ? 'Update Record' : 'Create Record'}
                            </Button>
                        </div>}
                        {formrender && formrender?.metaData?.length && formrender?.metaData.map((item, index) => (
                            <div key={index}>
                                <Form>
                                    {item.type === 'email' && <EmailTag data={item} index={index} />}
                                    {item.type === 'text' && <TextTag data={item} index={index} />}
                                    {item.type === 'number' && <NumberTag data={item} index={index} />}
                                    {item.type === 'checkbox' && <CheckBox data={item} index={index} />}
                                    {item.type === 'textArea' && <TextArea data={item} index={index} />}
                                    {item.type === 'date' && <DateArea data={item} index={index} />}
                                </Form>
                            </div>
                        ))}
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Forms
