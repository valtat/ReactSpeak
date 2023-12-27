const EnglishMeaningInput = ({ value, onChange }) => {
    return (
      <input
        type="text"
        name="englishMeaning"
        id="englishMeaning"
        value={value}
        onChange={onChange}
      />
    );
  };

export default EnglishMeaningInput;