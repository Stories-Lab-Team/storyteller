export const PromptInput = ({ prompt, setPrompt, children }) => {
  return (
    <form className="grid gap-y-3">
      <input
        type="text"
        label="Text Prompt"
        placeholder="A rainbow Bacalhau in the style of a Monet picture dancing on an Australian Beach"
        id="prompt_input"
        onChange={(e) => setPrompt(e.target.value)}
        className="w w-3/5 justify-center"
      />
      {children}
    </form>
  )
}
