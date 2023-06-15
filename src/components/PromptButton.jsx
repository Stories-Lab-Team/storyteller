export const PromptButton = ({ text, disabled, action }) => {
  return (
    <div>
      <button
        type="button"
        disabled={disabled}
        className={'btn btn-primary btn-lg disabled:btn-disabled'}
        onClick={() => action()}
      >
        {text ? text : ' Generate Images!'}
      </button>
    </div>
  )
}
