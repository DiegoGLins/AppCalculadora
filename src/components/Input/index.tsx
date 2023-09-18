import React from 'react';
import { InputContainer } from './styles';
import { InputOperation } from './operationStyle';

interface InputProps {
    value: string;
    showOperation: string;
}

const Input: React.FC<InputProps> = ({ value, showOperation }) => {

    return (
        <>
            <InputContainer>
                <InputOperation>
                    <input disabled value={showOperation} />
                </InputOperation>
                <input disabled value={value} />
            </InputContainer>
        </>
    );
};

export default Input;
