import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Download, Calendar, Users, DollarSign, Activity, RefreshCcw } from 'lucide-react';
import { analyticsData } from '../utils/sampleData';

const Analytics = () => {
  const { t } = useLanguage();
  const [period, setPeriod] = useState('month'); // month, quarter, year
  const [isLoading, setIsLoading] = useState(false);
  
  // Refs for chart canvases
  const patientChartRef = useRef<HTMLCanvasElement>(null);
  const revenueChartRef = useRef<HTMLCanvasElement>(null);
  const procedureChartRef = useRef<HTMLCanvasElement>(null);
  const staffChartRef = useRef<HTMLCanvasElement>(null);
  
  // Simulate data refresh
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };
  
  // Simulate simple chart rendering (would normally use a chart library)
  useEffect(() => {
    const drawSimpleBarChart = (
      canvas: HTMLCanvasElement | null, 
      data: {label: string, value: number}[]
    ) => {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set dimensions
      const width = canvas.width;
      const height = canvas.height;
      const barWidth = width / data.length * 0.6;
      const spacing = width / data.length * 0.4;
      const maxValue = Math.max(...data.map(item => item.value));
      
      // Draw bars
      data.forEach((item, index) => {
        const x = index * (barWidth + spacing) + spacing / 2;
        const barHeight = (item.value / maxValue) * (height - 40);
        const y = height - barHeight - 20;
        
        // Draw bar
        ctx.fillStyle = '#0073b9';
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw label
        ctx.fillStyle = '#333';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.label, x + barWidth / 2, height - 5);
        
        // Draw value
        ctx.fillStyle = '#333';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.value.toString(), x + barWidth / 2, y - 5);
      });
    };
    
    // Patient chart
    drawSimpleBarChart(
      patientChartRef.current,
      analyticsData.patientMetrics.byAge.map(item => ({
        label: item.group,
        value: item.count
      }))
    );
    
    // Revenue chart
    drawSimpleBarChart(
      revenueChartRef.current,
      analyticsData.revenueMetrics.byProcedure.map(item => ({
        label: item.procedure,
        value: item.amount
      }))
    );
    
    // Procedure chart
    drawSimpleBarChart(
      procedureChartRef.current,
      analyticsData.procedureMetrics.mostCommon.map(item => ({
        label: item.procedure.split(' ')[0], // Just use first word to fit
        value: item.count
      }))
    );
    
    // Staff chart
    drawSimpleBarChart(
      staffChartRef.current,
      analyticsData.staffMetrics.byProvider.map(item => ({
        label: item.provider.split(' ')[1], // Just use last name to fit
        value: item.revenue / 1000 // Scale down for display
      }))
    );
    
  }, [period, isLoading]);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('analytics.title')}</h1>
          <p className="text-gray-500">Data insights for your practice</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              className={`px-3 py-1.5 text-sm ${
                period === 'month' ? 'bg-[#0073b9] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setPeriod('month')}
            >
              Month
            </button>
            <button
              className={`px-3 py-1.5 text-sm ${
                period === 'quarter' ? 'bg-[#0073b9] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setPeriod('quarter')}
            >
              Quarter
            </button>
            <button
              className={`px-3 py-1.5 text-sm ${
                period === 'year' ? 'bg-[#0073b9] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setPeriod('year')}
            >
              Year
            </button>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            icon={<RefreshCcw size={16} />}
            onClick={refreshData}
            className={isLoading ? 'opacity-70 pointer-events-none' : ''}
          >
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            icon={<Download size={16} />}
          >
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Patients</p>
              <p className="mt-2 text-3xl font-semibold text-gray-800">{analyticsData.patientMetrics.total}</p>
              <div className="mt-2 flex items-center">
                <span className="text-sm font-medium text-green-600">
                  +{analyticsData.patientMetrics.newThisMonth}
                </span>
                <span className="text-sm text-gray-500 ml-1">new this month</span>
              </div>
            </div>
            <div className="p-2 rounded-md bg-blue-100 text-[#0073b9]">
              <Users size={24} />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
              <p className="mt-2 text-3xl font-semibold text-gray-800">
                {formatCurrency(analyticsData.revenueMetrics.currentMonth)}
              </p>
              <div className="mt-2 flex items-center">
                <span className="text-sm font-medium text-green-600">
                  +{((analyticsData.revenueMetrics.currentMonth / analyticsData.revenueMetrics.previousMonth - 1) * 100).toFixed(1)}%
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-2 rounded-md bg-green-100 text-green-600">
              <DollarSign size={24} />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Procedures</p>
              <p className="mt-2 text-3xl font-semibold text-gray-800">{analyticsData.procedureMetrics.totalPerformed}</p>
              <div className="mt-2 flex items-center">
                <span className="text-sm font-medium text-gray-600">
                  {analyticsData.procedureMetrics.satisfaction} / 5
                </span>
                <span className="text-sm text-gray-500 ml-1">satisfaction</span>
              </div>
            </div>
            <div className="p-2 rounded-md bg-purple-100 text-purple-600">
              <Activity size={24} />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Appointments</p>
              <p className="mt-2 text-3xl font-semibold text-gray-800">189</p>
              <div className="mt-2 flex items-center">
                <span className="text-sm font-medium text-orange-600">
                  87%
                </span>
                <span className="text-sm text-gray-500 ml-1">completion rate</span>
              </div>
            </div>
            <div className="p-2 rounded-md bg-orange-100 text-orange-600">
              <Calendar size={24} />
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title={t('analytics.patients')}>
          <div className="h-64">
            <canvas ref={patientChartRef} width="400" height="200" className="w-full h-full"></canvas>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Active Patients</p>
              <p className="text-xl font-semibold text-gray-800">{analyticsData.patientMetrics.active}</p>
              <p className="text-xs text-gray-500">
                {((analyticsData.patientMetrics.active / analyticsData.patientMetrics.total) * 100).toFixed(1)}% of total
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Retention Rate</p>
              <p className="text-xl font-semibold text-gray-800">{analyticsData.patientMetrics.retention}%</p>
              <p className="text-xs text-gray-500">Based on 12-month activity</p>
            </div>
          </div>
        </Card>
        
        <Card title={t('analytics.revenue')}>
          <div className="h-64">
            <canvas ref={revenueChartRef} width="400" height="200" className="w-full h-full"></canvas>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Year-to-Date</p>
              <p className="text-xl font-semibold text-gray-800">{formatCurrency(analyticsData.revenueMetrics.yearToDate)}</p>
              <p className="text-xs text-gray-500">
                {((analyticsData.revenueMetrics.yearToDate / analyticsData.revenueMetrics.projectedAnnual) * 100).toFixed(1)}% of projected
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Projected Annual</p>
              <p className="text-xl font-semibold text-gray-800">{formatCurrency(analyticsData.revenueMetrics.projectedAnnual)}</p>
              <p className="text-xs text-gray-500">Based on current performance</p>
            </div>
          </div>
        </Card>
        
        <Card title={t('analytics.procedures')}>
          <div className="h-64">
            <canvas ref={procedureChartRef} width="400" height="200" className="w-full h-full"></canvas>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Most Common Procedures</h4>
            <div className="space-y-2">
              {analyticsData.procedureMetrics.mostCommon.slice(0, 3).map((procedure, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-1/2">
                    <p className="text-sm text-gray-800">{procedure.procedure}</p>
                  </div>
                  <div className="w-1/2">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-[#0073b9] h-2 rounded-full" 
                          style={{ width: `${(procedure.count / analyticsData.procedureMetrics.totalPerformed) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{procedure.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        
        <Card title={t('analytics.staff')}>
          <div className="h-64">
            <canvas ref={staffChartRef} width="400" height="200" className="w-full h-full"></canvas>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Provider Performance</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patients</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Procedures</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {analyticsData.staffMetrics.byProvider.map((provider, index) => (
                    <tr key={index}>
                      <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-800">{provider.provider}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{provider.patients}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{provider.procedures}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{formatCurrency(provider.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;