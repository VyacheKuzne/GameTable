import React, { useEffect, useState } from "react";
import EditLine from "../../img/EditLine.svg";
import Cross from "../../img/Cross.svg";
import axios from "axios";
type TableHeader = {
  label: string;
  key: string;
};
type User = {
  id: number;
  name: string;
  secondname: string
  email: string;
  phone: string;
  password: string;
  status?: string;
  tariff?: string;
  nickname: string
};

type Props = {
  tableHeadersWithKeys: TableHeader[];
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
  isDelete: boolean;
  isEdit: boolean;
  selectedUser?: User | null;
  isCreate?: boolean;
  setIsCreate?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AdminUserForm({
  tableHeadersWithKeys,
  setIsEdit,
  setIsDelete,
  setIsCreate,
  isDelete,
  isEdit,
  isCreate,
  selectedUser,
}: Props) {
  const [userData, setUserData] = useState<User | null>(null);
  useEffect(() => {
    if (selectedUser) {
      setUserData(selectedUser); // Инициализация состояния из пропса
    }
  }, [selectedUser]);
  const handleInputChange = (key: keyof User, value: string) => {
    if (userData) {
      setUserData({
        ...userData,
        [key]: value,
      });
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    try {
      console.log(userData);
      const response = await axios.patch(
        "http://localhost:3000/update",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          //   withCredentials: true,
        }
      );
      //   document.cookie = `access_token=${response.data.token}; path=/; HttpOnly`;
      //   console.log(document.cookie);

      console.log(response.status);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(selectedUser);
  useEffect (()=>{
    console.log(isCreate)
  },[isCreate])

  function closeModalBlock () {
    setIsEdit(false);
    setIsDelete(false);
    setIsCreate?.(false);
  }

  async function deleteUser (){
    try {
      const responce = await axios.patch(
        "http://localhost:3000/deleteUser",
        userData
      )
      console.log(responce.status)
    } catch (error) {
      
    }
  }
  return (
    <div
      className={`bg-custom-fon-darkGray fixed w-screen h-screen z-40 content-center ${
        isDelete || isEdit || isCreate ? "block" : "hidden"
      }`}
    >
      <div
        className={`bg-custom-darkGray relative rounded-[20px] p-[1.5%] w-1/4 m-auto ${
          isEdit ? "block" : "hidden"
        }`}
      >
        <button
          onClick={() => closeModalBlock()}
          className="absolute right-[-10px] top-[-10px] bg-custom-red flex items-center justify-center w-[33px] h-[33px] rounded-[10px]"
        >
          <img src={Cross} alt="Cross" />
        </button>
        <div className="flex flex-col items-center">
          <p className="text-[22px] font-medium text-white">
            Изменить данные пользователя
          </p>
          <img src={EditLine} alt="EditLine" />
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className={`flex flex-col justify-between`}
            style={{ height: `calc(${tableHeadersWithKeys.length} * 67px)` }}
          >
            {tableHeadersWithKeys
              .filter(
                (tableHeaders) =>
                  tableHeaders.key !== "id" && tableHeaders.key !== "createdAt"
              )
              .map((tableHeaders) => {
                return (
                  <div className="flex flex-col">
                    <label
                      className="pl-2 text-white font-medium"
                      htmlFor={`${tableHeaders.key}`}
                    >
                      {tableHeaders.label}
                    </label>
                    <input
                      type="text"
                      placeholder={`${tableHeaders.label}`}
                      className="h-[47px] rounded-[10px] pl-2"
                      value={
                        userData ? userData[tableHeaders.key as keyof User] : ""
                      }
                      onChange={(e) => {
                        handleInputChange(
                          tableHeaders.key as keyof User,
                          e.target.value
                        );
                      }}
                    />
                  </div>
                );
              })}
            <div className="w-full h-[67px] flex items-end">
              <button
                className="bg-custom-red rounded-[10px] w-full h-[47px]"
                type="submit"
              >
                <p className="text-white font-medium">Подтверждаю изменения</p>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className={`bg-custom-darkGray relative rounded-[20px] p-[1.8%] w-1/4 m-auto ${
          isDelete ? "block" : "hidden"
        }`}
      >
        <button
          onClick={() => closeModalBlock()}
          className="absolute right-[-10px] top-[-10px] bg-custom-red flex items-center justify-center w-[33px] h-[33px] rounded-[10px]"
        >
          <img src={Cross} alt="Cross" />
        </button>
        <div className="flex flex-col items-center">
          <p className="text-[22px] font-medium text-white">
            Подтвердить удаление
          </p>
          <img src={EditLine} alt="EditLine" />
          <p className="text-center text-white font-bold my-[3%]">
            Вы действительно хотите удалить пользователя {selectedUser?.name} {selectedUser?.secondname} ?
          </p>
        </div>
        <div>
          <div className="flex justify-around">
            <button  onClick = {() => deleteUser()} className="w-[50px] h-[50px] bg-custom-red rounded-[10px]">
              <p className="text-white font-bold">ДА</p>
            </button>
            <button onClick={()=>{setIsDelete(!isDelete)}} className="w-[50px] h-[50px] bg-custom-green rounded-[10px]">
              <p className="text-white font-bold">НЕТ</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

