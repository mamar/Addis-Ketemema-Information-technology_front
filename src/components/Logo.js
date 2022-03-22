import logo from './image/logo.PNG';

// ----------------------------------------------------------------------
export default function Logo() {
  return (
    <img
      alt="Addis ERP"
      src={logo}
      style={
        ({ backgroundColor: '#4DBFDE' },
        {
          width: 100,
          height: 100,
          borderRadius: 100 / 2,
          overflow: 'hidden',
          borderWidth: 7,
          borderColor: 'red'
        })
      }
    />
  );
}
