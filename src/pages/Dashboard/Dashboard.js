import React, { useState } from 'react';
import { Col, Row } from 'antd';

import { useGetDashboardData } from 'apis/dashboard';
import { useRefetchTasks } from 'apis/task';
import { withAppContext } from 'contexts/AppContext/AppContext';

import Card from 'components/Card/Card';
import TaskListSection from './components/TaskListSection/TaskListSection';
import PieChart from './components/PieChart/PieChart';

import { DashboardContainer, CompletedTaskText, TotalTaskText, List, ListItem } from './Dashboard.styles';
import TaskModal from './components/TaskModal/TaskModal';

const useTaskModal = () => {
  const [isTaskModalVisible, setTaskModalVisible] = useState(false);

  const openTaskModal = () => {
    setTaskModalVisible(true);
  };

  const closeTaskModal = () => {
    setTaskModalVisible(false);
  };

  return { isTaskModalVisible, openTaskModal, closeTaskModal };
};

const Dashboard = () => {
  const { isLoading, data: dashboardData, refetch: refetchDashboardData } = useGetDashboardData();
  const { isTaskModalVisible, openTaskModal, closeTaskModal } = useTaskModal();
  const refetchTasks = useRefetchTasks();

  const { tasksCompleted, totalTasks, latestTasks = [] } = dashboardData;

  const handleOnTaskUpdated = () => {
    refetchDashboardData();
    refetchTasks();
  };

  const handleOnTaskModalSubmitted = () => {
    refetchDashboardData();
    refetchTasks();
    closeTaskModal();
  };

  const handleOnAddNewTaskButtonClick = () => {
    openTaskModal();
  };

  const handleOnTaskModalClose = () => {
    closeTaskModal();
  };

  return (
    <DashboardContainer>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={24} md={8}>
          <Card isLoading={isLoading} title="Tasks Completed">
            <CompletedTaskText>{tasksCompleted}</CompletedTaskText>
            <TotalTaskText>/ {totalTasks}</TotalTaskText>
          </Card>
        </Col>
        <Col span={24} md={8}>
          <Card isLoading={isLoading} title="Latest Created Tasks">
            <List>
              {latestTasks.map(task => (
                <ListItem isCompleted={task.completed}>{task.name}</ListItem>
              ))}
            </List>
          </Card>
        </Col>
        <Col span={24} md={8}>
          <Card isLoading={isLoading} style={{ paddingLeft: 0, paddingRight: 0 }}>
            <PieChart tasksCompleted={tasksCompleted} totalTasks={totalTasks} />
          </Card>
        </Col>
      </Row>

      <TaskListSection onUpdated={handleOnTaskUpdated} onAddNewTaskButtonClick={handleOnAddNewTaskButtonClick} />
      <TaskModal visible={isTaskModalVisible} onClose={handleOnTaskModalClose} onSubmitted={handleOnTaskModalSubmitted} />
    </DashboardContainer>
  );
};

export default withAppContext(Dashboard);
