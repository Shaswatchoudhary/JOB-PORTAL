import React from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const Register = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          action=""
          className="w-1/2 border border-gray-500 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Register</h1>
          <div className="my-2 ">
            <Label>Name</Label>
            <Input type="text" placeholder="Smile jack"></Input>
          </div>
          <div className="my-2 ">
            <Label>Email</Label>
            <Input type="email" placeholder="Smilejack@gmail.com"></Input>
          </div>
          <div className="my-2 ">
            <Label>Password</Label>
            <Input type="password" placeholder="********"></Input>
          </div>
          <div className="my-2 ">
            <Label>Phone Number</Label>
            <Input type="phoneNumber" placeholder="+1234567890"></Input>
          </div>
          <div className="flex items-center justify-between"></div>
          <Label>Role </Label>

          <RadioGroup className="flex items-center gap-4 my-5 ">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                className="cursor-pointer"
              ></Input>
              <Label htmlFor="r1">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>
        </form>
      </div>
    </div>
  );
};

export default Register;
