
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
    // if(operation === 'x' && currentNumber !== '0' &&  piValue !== '0')
    if (firstNumber === '0') {
      setFirstNumber(currentNumber)
      setCurrentNumber('0')
      setOperation('x')
      setShowOperation('')

      if (currentNumber !== '0' && piValue !== '0' && operation === 'x' || operation === '=') {
        setOperation('x')
        handleEquation()

        // handleEquation()
        console.log('Opa olha eu aqui')
        console.log(piValue)
        console.log(currentNumber)
        console.log(firstNumber)
      }
    }
    else if (currentNumber !== '0' && piValue && operation === 'x') {
      // handleAddNumber(piValue)
      setCurrentNumber(piValue)
      const multiplyPiCurrent = String(Number(currentNumber) * Number(firstNumber))
      setCurrentNumber(multiplyPiCurrent)
      setFirstNumber('0')
      setOperation('x')
      // setCurrentNumber(currentNumber)
      setShowOperation(`${firstNumber} x ${currentNumber}`);
      console.log('Fui executado')
    }
    else if (currentNumber === piValue && operation === 'x') {
      // setFirstNumber(piValue)
      // setCurrentNumber(currentNumber)
      const multiplyPiCurrent = String(Number(firstNumber) * Number(currentNumber))
      setCurrentNumber(multiplyPiCurrent)
      setFirstNumber('0')
      setOperation('')
      setShowOperation(`${piValue}π x ${currentNumber}`);
      setOperation('=')
      // handleEquation();
      console.log('sou eu aqui agora')
      console.log(firstNumber)
      console.log(currentNumber)
      console.log(multiplyPiCurrent)
    }

    else if (firstNumber === piValue && operation === 'x') {
      // setFirstNumber(piValue)
      // setCurrentNumber(currentNumber)
      const multiplyPiFirst = String(Number(firstNumber) * Number(currentNumber))
      setCurrentNumber(multiplyPiFirst)
      setFirstNumber('0')
      setOperation('')
      setShowOperation(`${piValue}π x ${currentNumber}`);
      setOperation('=')
      // handleEquation();
      console.log('cai aqui')
      console.log(firstNumber)
      console.log(currentNumber)
      console.log(multiplyPiFirst)
    }
    else if (piMultiplier !== 1 && firstNumber !== piValue && operation === 'x') {
      // setFirstNumber(String(piMultiplier))
      const multiplyPiCurrent = String(Number(firstNumber) * Number(currentNumber))
      setCurrentNumber(multiplyPiCurrent)
      setPiMultiplier(1)
      // setFirstNumber(String('0'))
      setFirstNumber('0')
      setOperation('')
      setShowOperation(`${firstNumber} x ${currentNumber}`);
      console.log('Minha vez de executar')
      console.log(firstNumber)
      console.log(currentNumber)
      console.log(multiplyPiCurrent)
      setOperation('=')
      // setFirstNumber(currentNumber)
      // handleEquation();
    }
    else if (operation === 'x' && firstNumber !== '0' && currentNumber !== '0') {
      const multiply = Number(firstNumber) * Number(currentNumber)
      setCurrentNumber(String(multiply))
      setFirstNumber('0')
      console.log('Agora sou eu')
      console.log(firstNumber)
      console.log(currentNumber)
      console.log(multiply)
      // setFirstNumber(currentNumber)
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

      console.log('olha eu aqui')
      console.log(firstNumber)
      console.log(currentNumber)
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
      console.log("Elevado a pi clicado")
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
      // handleAddNumber(String(piNumber))
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
      // handleAddNumber(String(piNumber))
      // setFirstNumber(String(piNumber))
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
      // handleAddNumber(String(piNumber))
      setCurrentNumber(String(piNumber))
      handleEquation()
      console.log('passei por aqui')

      if (whatOperator && lastChar === 'π') {
        const piNumber = calcPi()
        // handleAddNumber(String(piNumber))
        setOperation(lastChar)
        setCurrentNumber(String(piNumber))
        console.log('Estou aqui')
        // console.log(firstNumber)
        // console.log(currentNumber)
        // console.log(whatOperator)
        // if (piValue) {

        handleAddNumber(String(piNumber))
        // setCurrentNumber(firstNumber)
        setCurrentNumber(String(piNumber))
        // setOperation(lastChar)
        handleEquation()
        // setCurrentNumber('0')
        setShowOperation(`${firstNumber} ${whatOperator} ${piValue}`)
        console.log(lastChar)
        console.log('agora estou aqui')
        //}
      }
      else {
        handleEquation()
      }
      // console.log(whatOperator)
      // console.log(piValue)
      // console.log(showOperator)
      // console.log(findOperator)
      // console.log(operators)
    }
    else {
      const piNumber = calcPi();
      handleAddNumber(String(piNumber))
      setPiValue(String(piNumber))
      setCurrentNumber(String(piNumber))
      // setOperation(expression)
      const newPiMultiplier = Number(piMultiplier) * Number(piNumber);
      setFirstNumber('0')
      setPiMultiplier(newPiMultiplier);
      setCurrentNumber(String(newPiMultiplier));
      setShowOperation(`${newPiMultiplier}π`);
      setOperation('=')
      console.log("Quem executa sou eu")
      console.log(firstNumber)
      console.log(currentNumber)
      console.log(piMultiplier)
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
      // setFirstNumber(currentNumber);
      setOperation('')
      console.log('fui executado tbm')
    } else if (expression === 'π') {
      const piNumber = calcPi()
      setPiValue(String(piNumber))
      const newCurrent = Number(currentNumber) * Number(piNumber);
      setPiMultiplier(newCurrent);
      setCurrentNumber(String(newCurrent));
      setShowOperation(`${currentNumber} x π`);
      setFirstNumber(currentNumber);
      console.log('E eu tbm')
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
      console.log(firstNumber)
      console.log(currentNumber)
      console.log("Porcentagem de pi executado")
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
