import { useMemo } from 'react';
import { Pie } from '@ant-design/charts';

const PieChart = ({ tasksCompleted, totalTasks }) => {
  const data = useMemo(
    () => [
      {
        label: 'Completed Tasks',
        value: tasksCompleted
      },
      {
        label: 'Incomplete Tasks',
        value: totalTasks - tasksCompleted
      }
    ],
    [tasksCompleted, totalTasks]
  );

  const config = useMemo(
    () => ({
      height: 120,
      width: 120,
      data: data,
      angleField: 'value',
      colorField: 'label',
      color: ({ label }) => {
        if (label === 'Completed Tasks') {
          return '#5285ec';
        }
        return '#e8ecec';
      },
      legend: false,
      label: {
        type: 'outer',
        content: '{name}'
      },
      interactions: [{ type: 'element-active' }]
    }),
    [data]
  );

  return <Pie {...config} />;
};

export default PieChart;
