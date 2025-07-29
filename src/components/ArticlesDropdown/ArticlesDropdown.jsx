import Select, { components } from 'react-select';
import css from './ArticlesDropdown.module.css';

const DropdownIndicator = (props) => {
  const { menuIsOpen } = props.selectProps;

  return (
    <components.DropdownIndicator {...props}>
      <span style={{ fontSize: '12px', marginLeft: '4px' }}>
        {menuIsOpen ? (
          <svg className={css.svgIcon}>
            <use href={`/chevron.svg#icon-chevron-up`}></use>
          </svg>
        ) : (
          <svg className={css.svgIcon}>
            <use href={`/chevron.svg#icon-chevron-down`}></use>
          </svg>
        )}
      </span>
    </components.DropdownIndicator>
  );
};

const options = [
  { value: 'all', label: 'All' },
  { value: 'popular', label: 'Popular' },
];

const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: 'var(--white)',
    borderRadius: '4px',
    border: '1px solid var(--light-gray)',
    padding: '4px 0px',
    fontSize: '16px',
    width: '169px',
    height: '33px',
    boxShadow: 'none',
    '&:hover': { borderColor: 'var(--light-gray)' },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? 'var(--light-green)' : 'var(--white)',
    color: 'var(--black)',
    padding: '8px 8px 8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  }),
  singleValue: (base) => ({
    ...base,
    fontWeight: '400',
    fontFamily: 'var(--font-family)',
    color: 'var(--gray)',
    lineHeight: '1.55',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '4px',
    overflow: 'hidden',
    boxShadow:
      '0 0 1px 0 rgba(0, 0, 0, 0.4), 0 8px 24px -6px rgba(0, 0, 0, 0.16)',
    backgroundColor: '#f7fffb',
    padding: '8px',
    zIndex: 10,
  }),
};

const ArticlesDropdown = ({ onChangeFilter }) => {
  const handleChange = (selectedOption) => {
    onChangeFilter(selectedOption.value);
  };
  return (
    <Select
      options={options}
      styles={customStyles}
      defaultValue={options[0]} // "All"
      isSearchable={false}
      onChange={handleChange}
      components={{ IndicatorSeparator: () => null, DropdownIndicator }}
    />
  );
};

export default ArticlesDropdown;
