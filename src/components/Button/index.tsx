import React from 'react';
import { ButtonContainer } from './styles';

interface ButtonProps {
    label?: React.ReactNode
    onClick: () => void;
    backgroundColor?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, backgroundColor }) => {
    return (
        <ButtonContainer style={{ backgroundColor: backgroundColor, justifyContent: 'center', alignContent: 'center' }} onClick={onClick}>
            {label}
        </ButtonContainer>
    );
};

export default Button;
