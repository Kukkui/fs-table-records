"use client";

// import { useEffect, useState, ChangeEvent, FormEvent } from "react";
// import { Button } from "@repo/ui/button";

// const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

// export default function Web() {
//   const [name, setName] = useState<string>("");
//   const [response, setResponse] = useState<{ message: string } | null>(null);
//   const [error, setError] = useState<string | undefined>();

//   useEffect(() => {
//     setResponse(null);
//     setError(undefined);
//   }, [name]);

//   const onChange = (e: ChangeEvent<HTMLInputElement>) =>
//     setName(e.target.value);

//   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const result = await fetch(`${API_HOST}/message/${name}`);
//       const response = await result.json();
//       setResponse(response);
//     } catch (err) {
//       console.error(err);
//       setError("Unable to fetch response");
//     }
//   };

//   const onReset = () => {
//     setName("");
//   };

//   return (
//     <div>
//       <h1>Web</h1>
//       <form onSubmit={onSubmit}>
//         <label htmlFor="name">Name </label>
//         <input
//           type="text"
//           name="name"
//           id="name"
//           value={name}
//           onChange={onChange}
//         ></input>
//         <Button type="submit">Submit</Button>
//       </form>
//       {error && (
//         <div>
//           <h3>Error</h3>
//           <p>{error}</p>
//         </div>
//       )}
//       {response && (
//         <div>
//           <h3>Greeting</h3>
//           <p>{response.message}</p>
//           <Button onClick={onReset}>Reset</Button>
//         </div>
//       )}
//     </div>
//   );
// }

// NEW ONE
import React, { useMemo, useState } from 'react';
import { Radio, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import axios from 'axios';

type ColumnsType<T extends object> = TableProps<T>['columns'];
type TablePagination<T extends object> = NonNullable<Exclude<TableProps<T>['pagination'], boolean>>;
type TablePaginationPosition<T extends object> = NonNullable<
  TablePagination<T>['position']
>[number];

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const topOptions = [
  { label: 'topLeft', value: 'topLeft' },
  { label: 'topCenter', value: 'topCenter' },
  { label: 'topRight', value: 'topRight' },
  { label: 'none', value: 'none' },
];

const bottomOptions = [
  { label: 'bottomLeft', value: 'bottomLeft' },
  { label: 'bottomCenter', value: 'bottomCenter' },
  { label: 'bottomRight', value: 'bottomRight' },
  { label: 'none', value: 'none' },
];

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: string[]) => (
      <span>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

const App: React.FC = () => {
  const [top, setTop] = useState<TablePaginationPosition<DataType>>('topLeft');
  const [bottom, setBottom] = useState<TablePaginationPosition<DataType>>('bottomRight');
  const [data, setData] = useState<DataType[]>([]);

  useMemo(() => {
    (async () => {
      const fetchRecordsResult = await axios.get(`${API_HOST}/records`);
      const recordsData = fetchRecordsResult?.data || [];

      setData(recordsData);
    })();
  }, []);

  return (
    <div>
      {/* <div>
        <Radio.Group
          style={{ marginBottom: 10 }}
          options={topOptions}
          value={top}
          onChange={(e) => {
            setTop(e.target.value);
          }}
        />
      </div>
      <Radio.Group
        style={{ marginBottom: 10 }}
        options={bottomOptions}
        value={bottom}
        onChange={(e) => {
          setBottom(e.target.value);
        }}
      /> */}
      <Table<DataType>
        columns={columns}
        pagination={{ position: ['bottomRight'] }}
        dataSource={data}
      />
    </div>
  );
};

export default App;