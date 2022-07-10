import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const withAuthentication = (OriginalComponent) => {

    const NewComponent = () => {
        const [inputActive, setInputActive] = useState('');
        const [inputFieldInfos, setInputFieldInfos] = useState({});
        const [showPassword, setShowPassword] = useState(false);
        const [showConfirmPassword, setShowConfirmPassword] = useState(false);

        const location = useLocation();
        const navigate = useNavigate();

        const showHideTogglePassword = () => {
            if (!showPassword) {
                setShowPassword(true);
            }
            else setShowPassword(false);
        }

        const showHideToggleConfirmPassword = () => {
            if (!showConfirmPassword) {
                setShowConfirmPassword(true);
            }
            else setShowConfirmPassword(false);
        }

        const handleOnChange = (e) => {
            const field = e.target.name;
            const fieldValue = e.target.value;
            const newInputFieldInfos = { ...inputFieldInfos };
            newInputFieldInfos[field] = fieldValue;
            setInputFieldInfos(newInputFieldInfos);
        }

        return (<OriginalComponent
            inputActive={inputActive}
            setInputActive={setInputActive}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            inputFieldInfos={inputFieldInfos}
            location={location}
            navigate={navigate}
            showHideTogglePassword={showHideTogglePassword}
            showHideToggleConfirmPassword={showHideToggleConfirmPassword}
            handleOnChange={handleOnChange}
        />);
    };

    return NewComponent;
};

export default withAuthentication;