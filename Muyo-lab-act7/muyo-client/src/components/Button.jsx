import { Link } from 'react-router-dom';

const variantClasses = {
  primary: 'border-teal-700 bg-teal-700 text-white shadow-sm hover:border-teal-800 hover:bg-teal-800',
  secondary: 'border-slate-300 bg-white text-slate-800 hover:border-teal-500 hover:text-teal-700',
};

const Button = ({
  children,
  to,
  type = 'button',
  variant = 'secondary',
  className = '',
}) => {
  const classes = [
    'inline-flex min-h-11 items-center justify-center rounded-md border px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600',
    variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(' ')
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;
