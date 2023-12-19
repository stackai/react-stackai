import './App.css';
import Stack from '../src/Stack';

function App() {
  return (
    <>
      <h1>Demo website</h1>
      <Stack
        project="https://www.stack-ai.com/embed/46bf5b6a-9b4d-48f6-8a13-cdfc4fe58520/11da0c81-afe2-4ccd-b498-807bbde8e7f1/653fefcfcc37c0093d55e6a9"
        width = {'35rem'}
        fixed = {true}
      />
    </>
  );
}

export default App;
