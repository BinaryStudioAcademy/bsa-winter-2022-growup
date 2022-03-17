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
import { Radar } from 'react-chartjs-2';
import { ITestTypeData } from '../common/interface';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const formatData = (
  data: ITestTypeData[],
): ChartData<'radar', (number | null)[], unknown> => {
  const labels = ['Driver', 'Amiable', 'Analytical', 'Expressive'];
  const chartData = labels.map((lbl: string) => {
    const currentEl = data.find(
      (el: ITestTypeData) => el.name == lbl,
    ) as ITestTypeData;
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
interface Props {
  data: ITestTypeData[];
}
export function Schedule({ data }: Props): JSX.Element {
  const chartData = formatData(data);
  return (
    <div className="w-75 ms-auto me-auto schedule">
      <Radar data={chartData} options={options} />
    </div>
  );
}
