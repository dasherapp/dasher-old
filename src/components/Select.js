import React from 'react'
import Downshift from 'downshift'

const Select = ({ getItems, ...props }) => (
  <Downshift
    defaultHighlightedIndex={0}
    {...props}
    render={({
      getInputProps,
      getItemProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem,
    }) => (
      <div>
        <input {...getInputProps()} />
        {isOpen && (
          <div>
            {getItems(inputValue).map((item, index) => (
              <div
                {...getItemProps({
                  key: item,
                  index,
                  item,
                  style: {
                    backgroundColor:
                      highlightedIndex === index ? 'lightgray' : 'white',
                    fontWeight: selectedItem === item ? 'bold' : 'normal',
                  },
                })}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    )}
  />
)

export default Select
