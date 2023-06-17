export const PromptInput = ({ prompt, setPrompt, children }) => {
  return (
    <form className="grid gap-y-3 w-full mt-4">
      <input
        type="text"
        label="Text Prompt"
        placeholder="A rainbow Bacalhau in the style of a Monet picture dancing on an Australian Beach"
        id="prompt_input"
        onChange={(e) => setPrompt(e.target.value)}
        className="justify-center input w-full"
      />
      {children}
    </form>
  )
}
