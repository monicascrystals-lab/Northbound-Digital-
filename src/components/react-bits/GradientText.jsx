import './gradient-text.css';

function GradientText({ children, as: Component = 'span', className = '', ...rest }) {
  return (
    <Component className={`gradient-text ${className}`.trim()} {...rest}>
      {children}
    </Component>
  );
}

export default GradientText;
