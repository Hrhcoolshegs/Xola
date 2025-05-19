import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Download, Filter, Calendar, BarChart2, PieChart, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';
import { treatmentService } from '../../services/treatmentService';
import { generateTreatmentReport } from '../../services/reportService';

const COLORS = ['#0073b9', '#56c4c5', '#ff9e1b', '#10b981', '#6366f1'];

const TreatmentReports = () => {
  const [dateRange, setDateRange] = useState('month');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      await generateTreatmentReport();
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const treatmentData = [
    { name: 'Fillings', value: 35 },
    { name: 'Crowns', value: 20 },
    { name: 'Root Canals', value: 15 },
    { name: 'Cleanings', value: 45 },
    { name: 'Extractions', value: 10 }
  ];

  const successRateData = [
    { name: 'Jan', rate: 92 },
    { name: 'Feb', rate: 88 },
    { name: 'Mar', rate: 95 },
    { name: 'Apr', rate: 90 },
    { name: 'May', rate: 93 },
    { name: 'Jun', rate: 91 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Treatment Reports</h1>
          <p className="text-gray-500">Analytics and documentation for all treatment plans</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              className={`px-3 py-1.5 text-sm ${
                dateRange === 'month' ? 'bg-[#0073b9] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setDateRange('month')}
            >
              Month
            </button>
            <button
              className={`px-3 py-1.5 text-sm ${
                dateRange === 'quarter' ? 'bg-[#0073b9] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setDateRange('quarter')}
            >
              Quarter
            </button>
            <button
              className={`px-3 py-1.5 text-sm ${
                dateRange === 'year' ? 'bg-[#0073b9] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setDateRange('year')}
            >
              Year
            </button>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            icon={<Filter size={16} />}
          >
            Filter
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            icon={<Download size={16} />}
            onClick={handleGenerateReport}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Export Report'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-800">Total Plans</h3>
              <p className="mt-1 text-3xl font-semibold text-primary">125</p>
              <p className="text-sm text-gray-500 mt-1">+12% from last month</p>
            </div>
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <FileText size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-800">Success Rate</h3>
              <p className="mt-1 text-3xl font-semibold text-primary">92%</p>
              <p className="text-sm text-gray-500 mt-1">Based on completed plans</p>
            </div>
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <BarChart2 size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-800">Upcoming Steps</h3>
              <p className="mt-1 text-3xl font-semibold text-primary">28</p>
              <p className="text-sm text-gray-500 mt-1">Next 30 days</p>
            </div>
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <Calendar size={24} />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Treatment Distribution">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={treatmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {treatmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Most Common</p>
              <p className="text-xl font-semibold text-gray-800">Cleanings</p>
              <p className="text-xs text-gray-500">45% of all treatments</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Least Common</p>
              <p className="text-xl font-semibold text-gray-800">Extractions</p>
              <p className="text-xs text-gray-500">10% of all treatments</p>
            </div>
          </div>
        </Card>

        <Card title="Success Rate Trend">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={successRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rate" fill="#0073b9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Highest Rate</p>
              <p className="text-xl font-semibold text-gray-800">95%</p>
              <p className="text-xs text-gray-500">March 2024</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Average Rate</p>
              <p className="text-xl font-semibold text-gray-800">91.5%</p>
              <p className="text-xs text-gray-500">Last 6 months</p>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Recent Treatment Plans">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Treatment Type</th>
                <th className="px-4 py-3">Start Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Success Rate</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">Emma Thompson</td>
                <td className="px-4 py-3">Full Restoration</td>
                <td className="px-4 py-3">Mar 15, 2024</td>
                <td className="px-4 py-3">
                  <Badge variant="success">Completed</Badge>
                </td>
                <td className="px-4 py-3">95%</td>
                <td className="px-4 py-3">
                  <Button variant="outline" size="sm" icon={<FileText size={16} />}>
                    View Report
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default TreatmentReports;