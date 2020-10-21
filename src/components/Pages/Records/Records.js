import React, { useEffect, useState } from 'react'
import { Button, Col, Form, ListGroup, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { deleteRecords } from '../../../Redux/rootForm/rootFormActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Records() {
    const listCss = { cursor: 'pointer', listStyle: 'none', margin: '3px', padding: '10px', border: '1px dashed #ddd' }
    const [formList, setFormList] = useState([]);
    const mainForms = useSelector(state => state.form);
    const [formrender, setFormRender] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState({})
    const [showRecord, setShowRecord] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        let tempArr = mainForms?.records
        setFormList(tempArr);
    }, [mainForms])

    function getSelectedForm(value, index) {
        let tempVal = value?.id.split('_')[1];
        let tempForm = JSON.parse(JSON.stringify(mainForms.forms[tempVal]));
        for (let k = 0; k < tempForm['metaData'].length; k++) {
            let field = tempForm['metaData'][k]
            field['value'] = value[field['label']]
        }
        setSelectedRecord(value);
        setFormRender(tempForm);
        setShowRecord(true);
    }


    function deleteRecord() {
        dispatch(deleteRecords(selectedRecord));
        let tempArr = mainForms?.records
        setFormList(tempArr);
        setShowRecord(false);
        setFormRender([]);
        showToast('Record deleted successfully')
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

    function EmailTag(props) {
        return (
            <Form.Group controlId="formBasicEmail">
                <Form.Label>{props?.data?.displayLabel}</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={props?.data?.value} readOnly />
                <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>
        )
    }
    function TextTag(props) {
        return (
            <Form.Group controlId="formBasicEmail">
                <Form.Label>{props?.data?.displayLabel}</Form.Label>
                <Form.Control type="text" placeholder="Enter Text" value={props?.data?.value} readOnly />
            </Form.Group>
        )
    }
    function NumberTag(props) {
        return (
            <Form.Group controlId="formBasicEmail">
                <Form.Label>{props?.data?.displayLabel}</Form.Label>
                <Form.Control type="number" placeholder="12345...." value={props?.data?.value} readOnly />
            </Form.Group>
        )
    }
    function CheckBox(props) {
        return (
            <Form.Group controlId="formBasicCheckbox">
                <Form.Label>{props?.data?.displayLabel}</Form.Label>
                <Form.Check type="checkbox" label="Check me out" checked={props?.data?.value} disabled />
            </Form.Group>
        )
    }
    function TextArea(props) {
        return (
            <Form.Group controlId="formBasicTextArea">
                <Form.Label>{props?.data?.displayLabel}</Form.Label>
                <textarea className="form-control" rows="3" col="3" id="comment" value={props?.data?.value} readOnly></textarea>
            </Form.Group>
        )
    }
    function DateArea(props) {
        return (
            <Form.Group controlId="formBasicDate">
                <Form.Label>{props?.data?.displayLabel}</Form.Label>
                <Form.Check type="date" value={props?.data?.value} disabled />
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
                    <Col xs={12} md={4} className="border-right" style={{ height: '100vh', overflowY: 'auto' }}>
                        <h6 className="text-muted">List of Records</h6>
                        <br />
                        {formList && formList?.length && formList.map((item, index) => (
                            <ListGroup.Item key={index} style={listCss} onClick={() => getSelectedForm(item, index)} action>{item?.id}</ListGroup.Item>
                        ))}
                    </Col>
                    <Col xs={12} md={8}>
                        <h6 className="text-muted">Selected Record</h6>
                        {(formList && formList?.length && showRecord) &&
                            <div className="float-right">
                                <Link to={{ pathname: '/forms', state: { id: selectedRecord } }}>
                                    <span>
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
                                            <Button variant="outline-primary" size="sm">
                                                <FontAwesomeIcon icon={faEdit} /> Edit Record
                                        </Button>
                                        </OverlayTrigger>
                                    </span>
                                </Link>
                                {' '}
                                <span>
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delete</Tooltip>}>
                                        <Button variant="outline-danger" size="sm" onClick={deleteRecord}>
                                            <FontAwesomeIcon icon={faTrashAlt} /> Delete Record
                                        </Button>
                                    </OverlayTrigger>
                                </span>
                            </div>
                        }
                        {formrender && formrender?.metaData?.length ?
                            formrender?.metaData.map((item, index) => (
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
                            )) : <h4 className="text-muted text-center" >No Records Found</h4>}
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Records
