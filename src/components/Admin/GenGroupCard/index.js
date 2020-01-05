import React, { useState, useEffect } from 'react';
import { Card, Typography } from 'antd';
import { Formik } from 'formik';
import GenGroupForm from './GenGroupForm';
import axios from 'axios';

const { Paragraph } = Typography;

const GenGroupCard = () => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        async function fetchOptions() {
            const resp = await axios.get('url');
        }
    }, [options]);

    return (
        <Card bordered={true} title="Gironi">
            <Paragraph>Seleziona il numero di gironi da generare</Paragraph>
            <Formik
                initialValues={{
                    groups: 1
                }}
                onSubmit={(values, { setSubmitting }) => {
                    alert(values.groups);
                }}
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

export default GenGroupCard;