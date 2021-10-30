import React, { useMemo, useState } from 'react';
import { Checkbox, Col, List, message, Modal, Row, Skeleton } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

import { useGetTasks, updateTask, deleteTask } from 'apis/task';

import Title from 'components/Title/Title';
import Card from 'components/Card/Card';
import TaskModal from '../TaskModal/TaskModal';

import { AddTaskButton, HeaderRow, ItemTitleText, ListItemMeta, SearchInput } from './TaskListSection.styles';

const { confirm } = Modal;

const useTaskModal = () => {
  const [isTaskModalVisible, setTaskModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});

  const openTaskModal = selectedTask => {
    setTaskModalVisible(true);
    setSelectedTask(selectedTask);
  };

  const closeTaskModal = () => {
    setTaskModalVisible(false);
    setSelectedTask({});
  };

  return { isTaskModalVisible, selectedTask, openTaskModal, closeTaskModal };
};

const getListItemActions = (item, openTaskModal, onUpdated) => {
  const EditAction = () => {
    const handleOnEditButtonClick = () => {
      openTaskModal(item);
    };
    return <EditOutlined onClick={handleOnEditButtonClick} />;
  };

  const DeleteAction = () => {
    const handleOnDeleteButtonClick = () => {
      confirm({
        title: 'Delete task',
        content: 'Are you sure you want to delete this task?',
        onOk: () =>
          deleteTask(item._id)
            .then(() => onUpdated())
            .catch(ex => message.error(ex))
      });
    };
    return <DeleteOutlined onClick={handleOnDeleteButtonClick} />;
  };

  return [<EditAction />, <DeleteAction />];
};

const TaskList = ({ onAddNewTaskButtonClick, onUpdated }) => {
  const [searchKey, setSearchKey] = useState('');

  const { isTaskModalVisible, selectedTask, openTaskModal, closeTaskModal } = useTaskModal();
  const { isLoading: isTasksLoading, data: tasks } = useGetTasks();

  const filteredTaskList = useMemo(() => {
    return tasks.filter(task => task.name.toLowerCase().includes(searchKey && searchKey.toLowerCase()));
  }, [searchKey, tasks]);

  const handleOnCheckChange = id => evt => {
    const isChecked = evt.target.checked;
    updateTask(id, { completed: isChecked })
      .then(() => {
        onUpdated();
      })
      .catch(ex => message.error(ex));
  };

  const handleOnSearchInputChange = evt => {
    const searchKey = evt.target.value;
    setSearchKey(searchKey);
  };

  const handleOnTaskModalClose = () => {
    closeTaskModal();
  };

  const handleOnUpdateTaskSubmitted = () => {
    closeTaskModal();
    onUpdated();
  };

  return (
    <>
      <HeaderRow justify="space-between" align="center">
        <Col span={24} md={8} lg={12}>
          <Title>Tasks</Title>
        </Col>
        <Col span={24} md={16} lg={12}>
          <Row gutter={[16, 16]} justify="end">
            <Col span={24} md={16}>
              <SearchInput prefix={<SearchOutlined />} placeholder="Search by task name" onChange={handleOnSearchInputChange} />
            </Col>
            <Col span={24} md={8}>
              <AddTaskButton type="primary" onClick={onAddNewTaskButtonClick}>
                + New Task
              </AddTaskButton>
            </Col>
          </Row>
        </Col>
      </HeaderRow>
      <Card>
        <List
          itemLayout="horizontal"
          dataSource={filteredTaskList}
          renderItem={item => (
            <List.Item actions={getListItemActions(item, openTaskModal, onUpdated)}>
              <Skeleton avatar title={false} loading={isTasksLoading} active>
                <ListItemMeta
                  avatar={<Checkbox defaultChecked={item.completed} onChange={handleOnCheckChange(item._id)} />}
                  title={<ItemTitleText isCompleted={item.completed}>{item.name}</ItemTitleText>}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </Card>
      <TaskModal
        visible={isTaskModalVisible}
        defaultValue={selectedTask}
        onClose={handleOnTaskModalClose}
        onSubmitted={handleOnUpdateTaskSubmitted}
      />
    </>
  );
};
export default TaskList;
