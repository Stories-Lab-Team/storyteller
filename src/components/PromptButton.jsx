export const PromptButton = ({ text, disabled, action }) => {
  return (
    <div>
      <button
        className={'btn btn-primary btn-lg disabled:btn-disabled'}
        onClick={() => action()}
      >
        {text ? text : ' Generate Images!'}
      </button>
    </div>
  )
}