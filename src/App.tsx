import { ChangeEvent, useMemo, useState } from 'react';
import { Wheel } from 'react-custom-roulette';

const backgroundColors = ['#ff8f43', '#70bbe0', '#0b3351', '#f9dd50'];
const textColors = [
  '#0b3351',
  '#0b3351',
  '#f9dd50',
  '#0b3351',
  '#0b3351',
  '#0b3351',
  '#70bbe0',
  '#0b3351',
];
const outerBorderColor = '#eeeeee';
const outerBorderWidth = 10;
const innerBorderColor = '#30261a';
const innerBorderWidth = 0;
const innerRadius = 0;
const radiusLineColor = '#eeeeee';
const radiusLineWidth = 8;
const fontSize = 17;
const textDistance = 60;
const spinDuration = 1.0;

export const App = () => {
  const [input, setInput] = useState('sample1\nsample2\nsample3\nsample4');
  const inputOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value);

  const data = useMemo(
    () =>
      input
        .split('\n')
        .filter((v) => !!v)
        .map((v) => ({ option: v })),
    [input],
  );

  const [spinning, setSpinning] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const onStartSpin = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setSpinning(true);
  };
  const onStopSpin = () => {
    setMustSpin(false);
    setSpinning(false);
  };

  return (
    <div
      className="d-flex flex-column align-items-center gap-2"
      style={{ width: '480px', margin: '0 auto', padding: '20px 16px' }}
    >
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={backgroundColors}
        textColors={textColors}
        fontSize={fontSize}
        outerBorderColor={outerBorderColor}
        outerBorderWidth={outerBorderWidth}
        innerRadius={innerRadius}
        innerBorderColor={innerBorderColor}
        innerBorderWidth={innerBorderWidth}
        radiusLineColor={radiusLineColor}
        radiusLineWidth={radiusLineWidth}
        spinDuration={spinDuration}
        textDistance={textDistance}
        onStopSpinning={onStopSpin}
      />
      <button className="btn btn-primary fw-bold" onClick={onStartSpin}>
        SPIN
      </button>
      <div className="fs-1 fw-bold">{spinning ? '...' : data[prizeNumber]?.option}</div>
      <textarea className="form-control" rows={8} value={input} onChange={inputOnChange} />
    </div>
  );
};
