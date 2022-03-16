import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { IUserQuizResult } from 'common/interfaces/user-quiz';
import { useAppSelector } from 'hooks/hooks';
import { Radar } from 'react-chartjs-2';
import { Data } from '../common/interface';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const formatData = (
  data: Data[],
): ChartData<'radar', (number | null)[], unknown> => {
  const labels = ['driver', 'amiable', 'analytical', 'expressive'];
  const chartData = labels.map((lbl: string) => {
    const currentEl = data.find((el: Data) => el.name == lbl) as Data;
    return currentEl.value;
  });
  return {
    labels: labels,
    datasets: [
      {
        label: 'Skill value',
        data: chartData,
        backgroundColor: 'rgba(70, 61, 168, 0.2)',
        borderColor: 'rgba(41, 25, 101, 1)',
        borderWidth: 1,
      },
    ],
  };
};
const options = {
  scales: {
    r: {
      angleLines: {
        display: false,
      },
      suggestedMin: 0,
      suggestedMax: 10,
      pointLabels: {
        font: {
          size: 16,
          family: 'Nunito',
          weight: 'bold',
        },
        color: 'black',
      },
      ticks: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(70, 61, 168, 1)',
      titleFont: {
        size: 14,
      },
      bodyFont: {
        size: 14,
      },
      displayColors: false,
    },
  },
};

export function Schedule(): JSX.Element {
  const result = useAppSelector(
    (state) => state.workStyleQuiz.result,
  ) as IUserQuizResult[];
  const data: Data[] = result.map((item) => {
    return {
      name: item.quizCategory.name,
      value: item.score,
    };
  });
  const chartData = formatData(data);

  const maxPoints = Math.max(...data.map((item) => item.value));
  const maxItem = data.find((item) => item.value == maxPoints) as Data;
  const title = maxItem.name[0].toUpperCase() + maxItem.name.slice(1);

  return (
    <>
      <span className="fs-3 mt-1 fw-bold ps-3">{title}</span>
      <div className="w-75 ms-auto me-auto schedule">
        <Radar data={chartData} options={options} />
      </div>
    </>
  );
}
