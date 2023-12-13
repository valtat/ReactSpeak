import CreatableSelect from "react-select/creatable";

const SanitizedCreatableSelect = ({ value, options, onChange }) => {
    const handleChange = (selectedOption) => {
      let processedValue = selectedOption ? selectedOption.value.replace(
        /[`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi,
        ""
      ) : "";
      onChange(processedValue);
    };
  
    return (
      <CreatableSelect
        isClearable
        type="text"
        value={value ? { label: value, value: value } : null}
        onChange={handleChange}
        options={options.map((option) => ({
          label: option,
          value: option,
        }))}
        styles={{
            control: (provided) => ({
              ...provided,
              width: '100%',
              padding: '1rem',
              border: '1px solid #0f5259',
              borderRadius: '5px',
              fontSize: '16px',
              backgroundColor: 'white',
            }),
            option: (provided) => ({
              ...provided,
              textAlign: 'center',
              fontSize: '1rem',
              fontFamily: 'sans-serif',
              color: 'black',
              backgroundColor: 'white',
              padding: '1rem',
            }),
          }}
        placeholder="Type or select a language"
      />
    );
  };

export default SanitizedCreatableSelect;