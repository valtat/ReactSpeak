const LanguageSelect = ({ value, options, onChange }) => {
    return (
      <select
        name="language"
        id="language"
        value={value}
        onChange={onChange}
      >
        <option value="">Select a language</option>
        {options.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    );
  };

export default LanguageSelect;