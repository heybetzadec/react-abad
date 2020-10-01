import React from 'react';
import { useTranslation } from "react-i18next";

const HomePage = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h2>{t('home')}</h2>
        </div>
    )
}

export default HomePage;