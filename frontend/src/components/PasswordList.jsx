import React, { useEffect, useState } from "react";
import PasswordCard from "./PasswordCard";

const PasswordList = ({ passwords, onEdit, onDelete }) => {

  return (
    <div className="flex flex-wrap flex-grow gap-2 p-4 w-full">
      {passwords.length === 0 ? (
        <p className="text-gray-500 text-center w-full">No passwords saved yet.</p>
      ) : (
        passwords.map((password) => (
          <PasswordCard
            key={password._id}
            id={password._id}
            platform={password.platform}
            username={password.username}
            password={password.password}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default PasswordList;
