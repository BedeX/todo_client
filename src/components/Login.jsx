import React from 'react'
import { Button, Card, Input, Label, TextField } from "@heroui/react";
import { useState } from 'react';
import { login } from '../api';

export const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  // ideiglenes jelszavak
/*   const tempUser = 'BedeX';
  const tempPass = 123; */

  const handleLogin = async () => {
    try {
      const data = await login(username, pw);
      console.log(data);
      setIsLoggedIn(data.success)
    } catch (error) {
      console.log(error);
      setMsg(error.response?.data.message || "Nem sikerült kapcsolódni a szerverhez.");
    }
  }

  return (
    <Card className="w-full max-w-md">
      <Card.Header>
        <Card.Title>Bejelentkezés</Card.Title>
        <Card.Description>Add meg az adataidat</Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="flex flex-col gap-4">
          <TextField name="email">
            <Label>Email</Label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} variant="secondary" />
          </TextField>
          <TextField name="password" type="password">
            <Label>Jelszó</Label>
            <Input value={pw} onChange={(e) => setPw(e.target.value)} variant="secondary" />
          </TextField>
        </div>
      </Card.Content>
      <Card.Footer className="mt-4 flex flex-col gap-2">
        <Button className="w-full bg-indigo-900" type="submit" onClick={() => handleLogin()}>
          Bejelentkezés
        </Button>
      </Card.Footer>
      <div className="text-red-500">{msg}</div>
    </Card>
  );
}