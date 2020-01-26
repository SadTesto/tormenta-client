import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Modal } from 'antd';
import { Formik } from 'formik';
import GenGroupForm from './GenGroupForm';
import axios from 'axios';

const { Paragraph } = Typography;

const GenGroupCard = ({ onSubmit }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        async function fetchOptions() {
            try {
                const resp = await axios.get("http://dev.tronweb.it/tormenta-server/generate_groups.php");
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
        if (options.length === 0) {
            fetchOptions();
        }
    }, [options]);

    return (
        <Card bordered={true} title="Gironi">
            <Paragraph>Seleziona la modalità di generazione dei gironi:</Paragraph>
            <Formik
                initialValues={{
                    groups: 1
                }}
                onSubmit={onSubmit}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit
                }) => (
                    <GenGroupForm
                        options={[1]}
                        values={values}
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
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