import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Modal } from 'antd';
import { Formik } from 'formik';
import GenGroupForm from './GenGroupForm';
import axios from 'axios';

const { Paragraph } = Typography;

const GenGroupCard = ({ onSubmit }) => {
    const [options, setOptions] = useState(null);

    useEffect(() => {
        async function fetchOptions() {
            try {
                const resp = await axios.get("https://dev.tronweb.it/tormenta-server/get_case.php");
                const { data, response } = resp;
                if (data && data.code === 1) {
                    setOptions(data.groups);
                } else {
                    let errorMessage = "Errore inaspettato";
                    if (response && response.data && response.data.message) {
                        errorMessage = response.data.message;
                    }
                    Modal.error({
                        title: 'Errore',
                        content: errorMessage
                    });
                }
            } catch (e) {
                Modal.error({
                    title: 'Errore',
                    content: e.message
                });
            }
		}
        if (options === null) {
            fetchOptions();
        }
    }, [options]);

    return (
        <Card bordered={true} title="Gironi" loading={options === null}>
            <Paragraph>Seleziona la modalità di generazione dei gironi:</Paragraph>
            <Formik
                initialValues={{
                    groups: 0
                }}
                onSubmit={onSubmit}
            >
                {({
                    values,
                    handleSubmit,
                    setFieldValue
                }) => (
                    <GenGroupForm
                        options={(options || []).map(
                            opt => {
                                let text;
                                if (opt.length === 1) {
                                    text = `1 girone da ${opt[0]} squadre`;
                                } else {
                                    if (opt.every(el => el === opt[0])) {
                                        text = `${opt.length} gironi da ${opt[0]} squadre`;
                                    } else {
                                        text = '';
                                        opt.forEach(t => text += `1 girone da ${t} squadre, `);
                                        text = text.substring(0, text.length - 2);
                                    }
                                }
                                return text;
                            }
                        )}
                        values={values}
                        handleSubmit={handleSubmit}
                        setFieldValue={setFieldValue}
                    />
                )}
            </Formik>
        </Card>
    );
};

GenGroupCard.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default GenGroupCard;