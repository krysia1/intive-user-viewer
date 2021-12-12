import React from 'react';
import { Button, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { getParagraph } from './Paragraph';

const handleSearch = (
  selectedKeys: any,
  confirm: any,
  dataIndex: any,
  setSearchText: (newVal: string) => void,
  setSearchedColumn: (newVal: string) => void
) => {
  confirm();
  setSearchText(selectedKeys[0]);
  setSearchedColumn(dataIndex);
};

const handleReset = (
  clearFilters: any,
  setSearchText: (newVal: string) => void
) => {
  clearFilters();
  setSearchText('');
};

export function getColumnSearchProps(
  dataIndex: any,
  title: string,
  colClassName = '',
  searchedColumn: string,
  setSearchedColumn: (newVal: string) => void,
  searchText: string,
  setSearchText: (newVal: string) => void
) {
  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${title}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(
              selectedKeys,
              confirm,
              dataIndex,
              setSearchText,
              setSearchedColumn
            )
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() =>
              handleSearch(
                selectedKeys,
                confirm,
                dataIndex,
                setSearchText,
                setSearchedColumn
              )
            }
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters, setSearchText)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex] &&
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),

    render: (text: any) =>
      searchedColumn === dataIndex ? (
        <div className={`column-ellipsis ${colClassName} column-highlighted`}>
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        </div>
      ) : (
        getParagraph(text, colClassName)
      ),
  };
}
