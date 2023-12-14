
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
  const [piValue, setPiValue] = useState('0')
  const [piMultiplier, setPiMultiplier] = useState<number>(1);
  const [hasCleared, setHasCleared] = useState<boolean>(false);

  const handleClear = () => {
    setCurrentNumber('0')
    setFirstNumber('0')
    setOperation('')
    setShowOperation('')
    setHasCleared(true)
  }

  const calcPi = () => {
    const numTermos = 10000;
    let pi = 0;
    for (let i = 0; i < numTermos; i++) {
      const termo = Math.pow(-1, i) / (2 * i + 1);
      pi += termo;
    }
    const result = 4 * pi
    handleAddNumber(String(result))
    setOperation(('π'))
    console.log('fui clicado')
    return result
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

    setPiValue(piValue);
    if (firstNumber === '0') {
      setFirstNumber(currentNumber)
      setCurrentNumber('0')
      setOperation('+')
      setShowOperation('')
    }
    else if (currentNumber === piValue && operation === '+') {
      setCurrentNumber(piValue)
      const sumPiCurrent = String(Number(firstNumber) + Number(currentNumber))
      setCurrentNumber(sumPiCurrent)
      setFirstNumber('0')
      setOperation('')
      // setCurrentNumber(currentNumber)
      setShowOperation(`${firstNumber} + ${currentNumber}`);
      console.log('Valores com pi somados')
    }

    else if (operation === '+' && firstNumber !== '0' && currentNumber !== '0') {
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
    setPiValue(piValue);
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
    const piNumber = calcPi()
    setPiValue(String(piNumber));
    if (firstNumber === '0') {
      setFirstNumber(currentNumber)
      setCurrentNumber('0')
      setOperation('x')
      setShowOperation('')

      if (currentNumber !== '0' && piValue !== '0' && operation === 'x' || operation === '=') {
        setOperation('x')
        handleEquation()

        console.log(piValue)
        console.log(currentNumber)
        console.log(firstNumber)
      }
    }
    else if (currentNumber !== '0' && piValue && operation === 'x') {
      setCurrentNumber(piValue)
      const multiplyPiCurrent = String(Number(currentNumber) * Number(firstNumber))
      setCurrentNumber(multiplyPiCurrent)
      setFirstNumber('0')
      setOperation('x')
      setShowOperation(`${firstNumber} x ${currentNumber}`);
    }
    else if (currentNumber === piValue && operation === 'x') {

      const multiplyPiCurrent = String(Number(firstNumber) * Number(currentNumber))
      setCurrentNumber(multiplyPiCurrent)
      setFirstNumber('0')
      setOperation('')
      setShowOperation(`${piValue}π x ${currentNumber}`);
      setOperation('=')
    }

    else if (firstNumber === piValue && operation === 'x') {
      const multiplyPiFirst = String(Number(firstNumber) * Number(currentNumber))
      setCurrentNumber(multiplyPiFirst)
      setFirstNumber('0')
      setOperation('')
      setShowOperation(`${piValue}π x ${currentNumber}`);
      setOperation('=')
    }
    else if (piMultiplier !== 1 && firstNumber !== piValue && operation === 'x') {
      const multiplyPiCurrent = String(Number(firstNumber) * Number(currentNumber))
      setCurrentNumber(multiplyPiCurrent)
      setPiMultiplier(1)
      setFirstNumber('0')
      setOperation('')
      setShowOperation(`${firstNumber} x ${currentNumber}`);
      setOperation('=')
    }
    else if (operation === 'x' && firstNumber !== '0' && currentNumber !== '0') {
      const multiply = Number(firstNumber) * Number(currentNumber)
      setCurrentNumber(String(multiply))
      setFirstNumber('0')
      setOperation('=')
      setShowOperation(`${firstNumber} ${operation} ${currentNumber}`)
    }
    else {
      handleEquation();
      setFirstNumber(currentNumber)
      setOperation('x')
    }
  }

  const handleDivisionNumbers = () => {
    setPiValue(piValue)
    if (firstNumber === '0') {
      setFirstNumber(currentNumber)
      setCurrentNumber('0')
      setOperation('/')
      setShowOperation('')
    }
    else if (currentNumber === piValue) {
      setCurrentNumber('0')
      setFirstNumber('0')
      setOperation('=')
      setShowOperation(`${firstNumber} ÷ ${currentNumber}`);
      const division = String(Number(currentNumber) / Number(piValue))
      setCurrentNumber(String(division))
    }
    if (operation === '/' && firstNumber !== '0' && currentNumber !== '0') {
      const division = Number(firstNumber) / Number(currentNumber)
      setCurrentNumber(String(division))
      setFirstNumber('0')
      setOperation('')
      setShowOperation(`${firstNumber} ${'÷'} ${currentNumber}`)
    }
    else {
      handleEquation();
      setFirstNumber(currentNumber)
      setOperation('/')
    }
  }

  const handleExponentiation = () => {
    const piNumber = piValue
    setPiValue(piNumber);
    if (firstNumber === '0') {
      const base = Number(currentNumber);
      setFirstNumber(String(base))
      setCurrentNumber('0')
      setOperation('x^')
      setShowOperation('')
    }
    else if (firstNumber === piValue) {
      setFirstNumber(String(piValue))
      const base = Number(firstNumber)
      const exponent = Number(currentNumber)
      const result = Math.pow(base, exponent);
      setFirstNumber('0')
      setCurrentNumber(String(result));
      setOperation(`^${exponent}`);
      setShowOperation(`${base}^${exponent}`);
    }
    else if (currentNumber === piValue) {
      setCurrentNumber(String(piValue))
      const base = Number(firstNumber)
      const exponent = Number(currentNumber)
      const result = Math.pow(base, exponent);
      setFirstNumber('0')
      setCurrentNumber(String(result));
      setOperation(`^${base}`);
      setShowOperation(`${base}^${exponent}`);
    }
    else if (operation === 'x^' && firstNumber !== '0' && currentNumber !== '0') {
      const base = Number(firstNumber);
      const exponent = Number(currentNumber)
      const result = Math.pow(base, exponent);
      setFirstNumber('0');
      setCurrentNumber(String(result));
      setOperation(`^${exponent}`);
      setShowOperation(`${base}^${exponent}`);
    }
  };

  const handleFraction = () => {
    setPiValue(piValue);
    if (firstNumber === '0') {
      setFirstNumber('1')
      setCurrentNumber(currentNumber)
      setOperation('¹/x')
    }
    else if (currentNumber === piValue) {
      const fraction = Number(firstNumber) / Number(currentNumber)
      setFirstNumber('0')
      setCurrentNumber(String(fraction))
      setOperation('')
      setShowOperation(`${firstNumber} ${'/'} ${currentNumber}`)
    }

    else if (operation === '¹/x' && firstNumber !== '0' && currentNumber !== '0') {
      const fraction = Number(firstNumber) / Number(currentNumber)
      setFirstNumber('0')
      setCurrentNumber(String(fraction))
      setOperation('')
      setShowOperation(`${firstNumber} ${'/'} ${currentNumber}`)
    }
    else {
      setFirstNumber(currentNumber)
      setOperation('¹/x')
    }
  }

  const handleRootSquare = () => {
    setPiValue(piValue);
    setOperation('²√')
    if (currentNumber !== '0') {
      const squareRoot = Math.sqrt(Number(currentNumber));
      setFirstNumber('0');
      setCurrentNumber(String(squareRoot));
      setOperation('²√');
      setShowOperation(`²√${currentNumber}`);
    }
  };

  const isOperatorOrEmpty = (expression: string) => {
    // Função para calcular o valor de π

    if (expression === 'π') {
      const piNumber = calcPi()
      setCurrentNumber(String(piNumber))
      handleEquation()
    }

    const operators = ['+', '-', 'x', '/', '¹/x', 'x^', '²√'];
    const findOperator = operators.includes(expression[expression.length - 1])

    if (hasCleared) {
      // Tratamento inicial após a limpeza
      const piNumber = calcPi();
      setPiValue(String(piNumber));
      setPiMultiplier(piNumber);
      setCurrentNumber(String(piNumber));
      setOperation('π');
      setShowOperation(`${piNumber}π`);
      setHasCleared(false);
      return false;
    }

    const whatOperator = operators.find(item => item === operation)
    const lastChar = expression.charAt(expression.length - 1);

    if (findOperator) {
      const piNumber = calcPi()

      setCurrentNumber(String(piNumber))
      handleEquation()

      if (whatOperator && lastChar === 'π') {
        const piNumber = calcPi()
        setOperation(lastChar)
        setCurrentNumber(String(piNumber))
        handleAddNumber(String(piNumber))
        setCurrentNumber(String(piNumber))
        handleEquation()

        setShowOperation(`${firstNumber} ${whatOperator} ${piValue}`)

      }
      else {
        handleEquation()
      }
    }
    else {
      const piNumber = calcPi();
      handleAddNumber(String(piNumber))
      setPiValue(String(piNumber))
      setCurrentNumber(String(piNumber))
      const newPiMultiplier = Number(piMultiplier) * Number(piNumber);
      setFirstNumber('0')
      setPiMultiplier(newPiMultiplier);
      setCurrentNumber(String(newPiMultiplier));
      setShowOperation(`${newPiMultiplier}π`);
      setOperation('=')
    }
    if (expression === '') {
      return true;
    }


    if (expression.startsWith('π')) {
      const piNumber = calcPi();
      setPiValue(String(piNumber))
      setCurrentNumber(piValue)
      const newPiMultiplier = Number(piValue) * Number(currentNumber);
      setFirstNumber('0')
      setCurrentNumber('0')
      setPiMultiplier(newPiMultiplier);
      setCurrentNumber(String(newPiMultiplier));
      setShowOperation(`${currentNumber} x π`);
      setOperation('')

    } else if (expression === 'π') {
      const piNumber = calcPi()
      setPiValue(String(piNumber))
      const newCurrent = Number(currentNumber) * Number(piNumber);
      setPiMultiplier(newCurrent);
      setCurrentNumber(String(newCurrent));
      setShowOperation(`${currentNumber} x π`);
      setFirstNumber(currentNumber);

    }
    else if (operators.includes(expression[expression.length - 1])) {
      // Se o último caractere da expressão for um operador, apenas atualiza a operação
      setOperation(expression);
    } else {
      // Caso contrário, executa a operação pendente (se houver)
      handleEquation();
      setOperation(expression);
    }
    return false;
  };


  const handlePercentage = () => {
    setPiValue(piValue);
    // setPiValue(piNumber);
    if (firstNumber === '0') {
      setFirstNumber(currentNumber)
      setCurrentNumber('0')
      setOperation('%')
      setShowOperation('')
    }
    else if (firstNumber === piValue || currentNumber === piValue) {
      setOperation('/')
      setFirstNumber(String(piValue))
      setCurrentNumber(currentNumber)
      const division = (Number(firstNumber) * Number(currentNumber) / 100)
      setCurrentNumber(String(division))
    }

    else if (operation === '%' && firstNumber !== '0' && currentNumber !== '0') {
      const percent = Number(firstNumber) / 100;
      setFirstNumber(String(percent));
      const calcPercent = Number(percent) * Number(currentNumber)
      setCurrentNumber(String(calcPercent.toFixed(2)))
      setShowOperation(`${firstNumber} ${operation} ${currentNumber}`)
      setOperation('');
    }

    else if (operation == '%' || operation === 'x' || operation === '+' || operation === '/' || operation === '-') {
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
          setShowOperation(`${firstNumber} ${'+'} ${currentNumber} ${'%'}`)
          break;
        case 'x':
          setCurrentNumber(String(multiplyWithPercent.toFixed(4)));
          setShowOperation(`${firstNumber} ${'x'} ${currentNumber} ${'%'}`)
          setOperation('x')
          break;
        case '/':
          setCurrentNumber(String(divideWithPercent.toFixed(7)));
          setShowOperation(`${firstNumber} ${'÷'} ${currentNumber} ${'%'}`)
          setOperation('/')
          break;
        case '-':
          setCurrentNumber(String(subtractWithPercent.toFixed(4)));
          setShowOperation(`${firstNumber} ${'-'} ${currentNumber} ${'%'}`)
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

  const handleEquation = () => {
    if (firstNumber !== '0' && operation !== '' && currentNumber !== '0') {
      switch (operation) {
        case '+':
          handleSumNumbers();
          break;
        case '-':
          handleSubtractNumbers();
          break;
        case 'x':
          handleMultiplyNumbers();
          break;
        case '/':
          handleDivisionNumbers();
          break;
        case '%':
          handlePercentage();
          break;
        case '¹/x':
          handleFraction();
          break;
        case 'x^':
          handleExponentiation();
          break;
        case '²√':
          handleRootSquare()
          break;
        default:
          break;
      }
    }
  };

  return (
    <Container>
      <Content>
        <Input value={currentNumber} showOperation={showOperation} />
        <Row>
          <Button backgroundColor={'#797f93'} label='π' onClick={() => isOperatorOrEmpty(operation)} />
          <Button backgroundColor={'#797f93'} label='¹/x' onClick={handleFraction} />
          <Button backgroundColor={'#797f93'} label='x^' onClick={handleExponentiation} />
          <Button backgroundColor={'#797f93'} label='²√' onClick={handleRootSquare} />
        </Row>
        <Row>
          <Button backgroundColor={'#3b095c'} label='CE' onClick={handleClear} />
          <Button label='C' onClick={handleClear} />
          <Button label='%' onClick={handlePercentage} />
          <Button backgroundColor={'#000'} label='÷' onClick={handleDivisionNumbers} />
        </Row>
        <Row>
          <Button label='7' onClick={() => handleAddNumber('7')} />
          <Button label='8' onClick={() => handleAddNumber('8')} />
          <Button label='9' onClick={() => handleAddNumber('9')} />
          <Button backgroundColor={'#000'} label='x' onClick={handleMultiplyNumbers} />
        </Row>
        <Row>
          <Button label='4' onClick={() => handleAddNumber('4')} />
          <Button label='5' onClick={() => handleAddNumber('5')} />
          <Button label='6' onClick={() => handleAddNumber('6')} />
          <Button backgroundColor={'#000'} label='-' onClick={handleSubtractNumbers} />
        </Row>
        <Row>
          <Button label='1' onClick={() => handleAddNumber('1')} />
          <Button label='2' onClick={() => handleAddNumber('2')} />
          <Button label='3' onClick={() => handleAddNumber('3')} />
          <Button backgroundColor={'#000'} label='+' onClick={handleSumNumbers} />
        </Row>
        <Row>
          <Button label='0' onClick={() => handleAddNumber('0')} />
          <Button label='.' onClick={() => addPoint('.')} />
          <Button label={<BackspaceIcon style={{ height: '20px' }} />} onClick={() => handleErase('')} />
          <Button backgroundColor={'#336aeb'} label='=' onClick={handleEquation} />
        </Row>
      </Content>
    </Container>
  )
}
export default App
