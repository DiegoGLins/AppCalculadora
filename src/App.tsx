
import { useState } from 'react'
import { Container, Content, Row } from './ContainerStyle'
import Button from './components/Button'
import Input from './components/Input/index'
import BackspaceIcon from '@mui/icons-material/Backspace';

function App() {
  const [currentNumber, setCurrentNumber] = useState<string>('0')
  const [firstNumber, setFirstNumber] = useState<string>('0');
  const [operation, setOperation] = useState('')
  const [showOperation, setShowOperation] = useState('')

  const handleClear = () => {
    setCurrentNumber('0')
    setFirstNumber('0')
    setOperation('')
    setShowOperation('')
  }


  const handleAddNumber = (caract: string) => {
    if (caract === '.' && parseFloat(currentNumber) < 1) {
      const copyNumber = [...currentNumber]
      copyNumber.push(caract)
      setCurrentNumber(prev => `${prev === '0' ? caract : prev + copyNumber[copyNumber.length - 1]}`)
      setShowOperation(prev => `${prev} ${caract} ${copyNumber[copyNumber.length - 1]}`);
    } else {
      const copyNumber = [...currentNumber];
      copyNumber.push(caract);
      setCurrentNumber(prev => `${prev === '0' ? caract : prev + copyNumber[copyNumber.length - 1]}`);
      setShowOperation(prev => (prev === '0' ? '0' + caract : prev + caract));
    }
  };


  const handleErase = (caract: string) => {
    const copyNumber = [...currentNumber]
    copyNumber.push(caract)
    setCurrentNumber(prev => `${prev.length === 1 ? '0' : prev.slice(0, prev.length - 1)}`)
    setShowOperation(prev => `${prev.length === 0 ? '' : prev.slice(0, prev.length - 1)}`)
  }


  const addPoint = (caract: string) => {
    const copyNumber = [...currentNumber];
    if (caract === '.' && copyNumber.length - 1 < 1) {
      copyNumber.push(caract);
      console.log(copyNumber)
      console.log(caract)
      setCurrentNumber(prev => prev.length === 0 ? '0' : `${prev}${caract}`);
      setShowOperation(prev => prev.length === 0 ? String(0 + '.') : `${prev}${caract}`)
    } else if (!currentNumber.includes('.') || caract !== '.') {
      setCurrentNumber(prev => (prev === '0' ? caract : prev + caract));
      setShowOperation(prev => prev.length === 0 ? String(0 + '.') : `${prev}${caract}`)
    }
  };


  const handleSumNumbers = () => {
    if (firstNumber === '0') {
      setFirstNumber(currentNumber)
      setCurrentNumber('0')
      setOperation('+')
      setShowOperation('')
    } else if (operation === '+' && firstNumber !== '0' && currentNumber !== '0') {
      const sum = Number(firstNumber) + Number(currentNumber)
      setCurrentNumber(String(sum))
      setFirstNumber('0')
      setShowOperation(`${firstNumber} ${operation} ${currentNumber}`)
    }
    else {
      setFirstNumber(currentNumber)
      setOperation('+')
    }
  }

  const handleSubtractNumbers = () => {
    if (firstNumber === '0') {
      setFirstNumber(currentNumber)
      setCurrentNumber('0')
      setOperation('-')
      setShowOperation('')
    } else if (operation === '-' && firstNumber !== '0' && currentNumber !== '0') {
      const subtract = Number(firstNumber) - Number(currentNumber)
      setCurrentNumber(String(subtract))
      setFirstNumber('0')
      setOperation('')
      setShowOperation(`${firstNumber} ${operation} ${currentNumber}`)
    }
    else {
      setFirstNumber(currentNumber)
      setOperation('-')
    }
  }

  const handleMultiplyNumbers = () => {
    if (firstNumber === '0') {
      setFirstNumber(currentNumber)
      setCurrentNumber('0')
      setOperation('X')
      setShowOperation('')
    }
    else if (operation === 'X' && firstNumber !== '0' && currentNumber !== '0') {
      const multiply = Number(firstNumber) * Number(currentNumber)
      setCurrentNumber(String(multiply))
      setFirstNumber('0')
      setOperation('')
      setShowOperation(`${firstNumber} ${operation} ${currentNumber}`)
    }
    else {
      setFirstNumber(currentNumber)
      setOperation('X')
    }
  }

  const handleDivisionNumbers = () => {
    if (firstNumber === '0') {
      setFirstNumber(currentNumber)
      setCurrentNumber('0')
      setOperation('/')
      setShowOperation('')
    } else if (operation === '/' && firstNumber !== '0' && currentNumber !== '0') {
      const division = Number(firstNumber) / Number(currentNumber)
      setCurrentNumber(String(division))
      setFirstNumber('0')
      setOperation('')
      setShowOperation(`${firstNumber} ${'÷'} ${currentNumber}`)
    }
    else {
      setFirstNumber(currentNumber)
      setOperation('/')
    }
  }

  const handlePercentage = () => {
    if (firstNumber === '0') {
      setFirstNumber(currentNumber)
      setCurrentNumber('0')
      setOperation('%')
      setShowOperation('')
    } if (operation === '%' && firstNumber !== '0' && currentNumber !== '0') {
      const percent = Number(firstNumber) / 100;
      setFirstNumber(String(percent));
      const calcPercent = Number(percent) * Number(currentNumber)
      setCurrentNumber(String(calcPercent.toFixed(2)))
      setShowOperation(`${firstNumber} ${operation} ${currentNumber}`)
      setOperation('');
    }

    else if (operation == '%' || operation === 'X' || operation === '+' || operation === '/' || operation === '-') {
      const subtractWithPercent = Number(firstNumber) - (Number(currentNumber) * (Number(firstNumber)) * 0.01);
      const sumWithPercent = (Number(currentNumber) * (Number(firstNumber)) * 0.01 + Number(firstNumber));
      const multiplyWithPercent = (Number(currentNumber) * 0.01) * Number(firstNumber)
      const divideWithPercent = Number(firstNumber) / (Number(currentNumber) * 0.01)
      setCurrentNumber(String(divideWithPercent))

      setOperation('')
      setShowOperation(`${firstNumber} ${operation} ${currentNumber}`)
      switch (operation) {
        case '+':
          setCurrentNumber(String(sumWithPercent.toFixed(7)));
          setOperation('+')
          setShowOperation(`${firstNumber} ${'+'} ${currentNumber}  ${'%'}`)
          break;
        case 'X':
          setCurrentNumber(String(multiplyWithPercent.toFixed(4)));
          setShowOperation(`${firstNumber} ${'x'} ${currentNumber}  ${'%'}`)
          setOperation('X')
          break;
        case '/':
          setCurrentNumber(String(divideWithPercent.toFixed(7)));
          setShowOperation(`${firstNumber} ${'÷'} ${currentNumber}  ${'%'}`)
          setOperation('/')
          break;
        case '-':
          setCurrentNumber(String(subtractWithPercent.toFixed(4)));
          setShowOperation(`${firstNumber} ${'-'} ${currentNumber}  ${'%'}`)
          setOperation('-')
          break;
        default:
          break;
      }

      setFirstNumber('0');
      setOperation('');
    } else {
      setFirstNumber(currentNumber);
      setOperation('%');
    }
  };

  const handleEquaction = () => {
    if (firstNumber !== '0' && operation !== '' && currentNumber !== '0') {
      switch (operation) {
        case '+':
          handleSumNumbers()
          break;
        case '-':
          handleSubtractNumbers()
          break;
        case 'X':
          handleMultiplyNumbers()
          break;
        case '/':
          handleDivisionNumbers()
          break;
        case '%':
          handlePercentage()
          break;
        default: break;
      }
    } else {
      setCurrentNumber(currentNumber)
    }
  }

  return (
    <Container>
      <Content>
        <Input value={currentNumber} showOperation={showOperation} />
        <Row>
          <Button backgroundColor={'#3b095c'} label='CE' onClick={handleClear} />
          <Button label='C' onClick={handleClear} />
          <Button label='%' onClick={handlePercentage} />
          <Button backgroundColor={'#797f93'} label='÷' onClick={handleDivisionNumbers} />
        </Row>
        <Row>
          <Button label='7' onClick={() => handleAddNumber('7')} />
          <Button label='8' onClick={() => handleAddNumber('8')} />
          <Button label='9' onClick={() => handleAddNumber('9')} />
          <Button backgroundColor={'#797f93'} label='x' onClick={handleMultiplyNumbers} />
        </Row>
        <Row>
          <Button label='4' onClick={() => handleAddNumber('4')} />
          <Button label='5' onClick={() => handleAddNumber('5')} />
          <Button label='6' onClick={() => handleAddNumber('6')} />
          <Button backgroundColor={'#797f93'} label='-' onClick={handleSubtractNumbers} />
        </Row>
        <Row>
          <Button label='1' onClick={() => handleAddNumber('1')} />
          <Button label='2' onClick={() => handleAddNumber('2')} />
          <Button label='3' onClick={() => handleAddNumber('3')} />
          <Button backgroundColor={'#797f93'} label='+' onClick={handleSumNumbers} />
        </Row>
        <Row>
          <Button label='0' onClick={() => handleAddNumber('0')} />
          <Button label='.' onClick={() => addPoint('.')} />
          <Button label={<BackspaceIcon style={{ height: '20px' }} />} onClick={() => handleErase('')} />
          <Button backgroundColor={'#336aeb'} label='=' onClick={handleEquaction} />
        </Row>
      </Content>
    </Container>
  )
}

export default App


