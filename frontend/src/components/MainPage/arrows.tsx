import React from 'react'
import { VisibilityContext } from 'react-horizontal-scrolling-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'

function Arrow({
  children,
  disabled,
  onClick
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
}) {
  return (
    <div className="arrow-button-container">
      <button
        className=" text-white bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-full text-xl text-center inline-flex items-center mr-2"
        disabled={disabled}
        onClick={onClick}
        style={{
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          right: '1%',
          opacity: disabled ? '0' : '1',
          userSelect: 'none',
          height: '36px',
          width: '36px'
        }}
      >
        {children}
      </button>
    </div>
  )
}

export function LeftArrow() {
  const {
    isFirstItemVisible,
    scrollPrev,
    visibleElements,
    initComplete
  } = React.useContext(VisibilityContext)

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible)
  )
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible)
    }
  }, [isFirstItemVisible, visibleElements])

  return (
    <Arrow disabled={disabled} onClick={() => scrollPrev()}>
      <FontAwesomeIcon
        style={{ color: 'var(--black-color)' }}
        icon={faCaretLeft}
        size='sm'
      />
    </Arrow>
  )
}

export function RightArrow() {
  const { isLastItemVisible, scrollNext, visibleElements } = React.useContext(
    VisibilityContext
  )

  // console.log({ isLastItemVisible })
  const [disabled, setDisabled] = React.useState(
    !visibleElements.length && isLastItemVisible
  )
  React.useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible)
    }
  }, [isLastItemVisible, visibleElements])

  return (
    <Arrow disabled={disabled} onClick={() => scrollNext()}>
      <FontAwesomeIcon
        style={{ color: 'var(--black-color)' }}
        icon={faCaretRight}
        size='sm'
      />
    </Arrow>
  )
}
