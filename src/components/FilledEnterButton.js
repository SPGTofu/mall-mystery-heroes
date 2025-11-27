import EnterIcon from '../assets/enter-green.png';

const FilledEnterButton = ({ send }) => {
  return (
    <img 
      src={EnterIcon} 
      alt="Submit Button" 
      onClick={send} 
      style={{ cursor: 'pointer', marginLeft: '0.5rem', width: '50px', height: '50px' }} // Adjusted size
    />
  );
};

export default FilledEnterButton;
