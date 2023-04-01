import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const style = {
  table: {
    borderCollapse: 'collapse',
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px',
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px',
    },
    inputs: {
      marginBottom: '5px',
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border: 'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px',
    },
  },
};

function PhoneBookForm({ addEntryToPhoneBook }) {
  const [user, setUser] = useState({
    userFirstname: 'Coder',
    userLastname: 'Byte',
    userPhone: '8885559999',
  });

  const handleForm = (ev) => {
    handleInput(ev.target.name, ev.target.value);
  };

  const handleInput = (input, value) => {
    setUser({ ...user, [input]: value });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    addEntryToPhoneBook(user);
    setUser({
      userFirstname: '',
      userLastname: '',
      userPhone: '',
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      style={style.form.container}
    >
      <label>First name: </label>
      <br />
      <input
        style={style.form.inputs}
        className="userFirstname"
        name="userFirstname"
        type="text"
        placeholder={user.userFirstname}
        value={user.userFirstname}
        onChange={handleForm}
      />
      <br />
      <label>Last name: </label>
      <br />
      <input
        style={style.form.inputs}
        className="userLastname"
        name="userLastname"
        type="text"
        placeholder={user.userLastname}
        value={user.userLastname}
        onChange={handleForm}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userPhone"
        name="userPhone"
        type="text"
        placeholder={user.userPhone}
        value={user.userPhone}
        onChange={handleForm}
      />
      <br />
      <input
        style={style.form.submitBtn}
        className="submitButton"
        type="submit"
        value="Add User"
        onClick={handleClick}
      />
    </form>
  );
}

function InformationTable(props) {
  const sortedPhoneBook = props.phoneBook.sort((a, b) => {
    if (a.userLastname.toLowerCase() < b.userLastname.toLowerCase()) {
      return -1;
    }
    if (a.userLastname.toLowerCase() > b.userLastname.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  });
  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>
        {sortedPhoneBook.map((user, index) => (
          <tr key={index}>
            <td style={style.tableCell}>{user.userFirstname}</td>
            <td style={style.tableCell}>{user.userLastname}</td>
            <td style={style.tableCell}>{user.userPhone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Application(props) {
  const [phoneBook, setPhoneBook] = useState([]);

  const addEntryToPhoneBook = (user) => {
    setPhoneBook([...phoneBook, user]);
  };
  return (
    <section>
      <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook} />
      <InformationTable phoneBook={phoneBook} user={props.user} />
    </section>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Application />);
