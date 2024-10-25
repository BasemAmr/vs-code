import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface IProps {
    codeString: string;
}


const HighlightedSyntax = ( {codeString}: IProps ) => {
  return (
    <SyntaxHighlighter language="javascript" style={oneDark} showLineNumbers>
      {codeString}
    </SyntaxHighlighter>
  );
};

export default HighlightedSyntax;