import React from 'react';
import { useTranslation } from "react-i18next";

const HomePage = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h2>{t('Welcome to React')}</h2>
        </div>
    )
}

export default HomePage;