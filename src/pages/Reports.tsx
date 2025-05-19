import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  FileText,
  Download,
  Printer,
  Share2,
  Filter,
  Search,
  Calendar,
  User,
  BarChart2,
  FileBarChart,
  FileClock,
  FileCheck,
} from 'lucide-react';

const Reports = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('week');

  // Mock report data
  const reports = [
    {
      id: 'R001',
      title: 'Weekly Patient Statistics',
      type: 'analytics',
      date: '2024-02-20',
      author: 'Dr. Sarah Chen',
      status: 'completed',
    },
    {
      id: 'R002',
      title: 'Monthly Revenue Analysis',
      type: 'financial',
      date: '2024-02-19',
      author: 'Dr. James Wilson',
      status: 'pending',
    },
    {
      id: 'R003',
      title: 'Treatment Success Rates',
      type: 'clinical',
      date: '2024-02-18',
      author: 'Dr. Anna Garcia',
      status: 'completed',
    },
    {
      id: 'R004',
      title: 'Insurance Claims Summary',
      type: 'financial',
      date: '2024-02-17',
      author: 'Dr. Sarah Chen',
      status: 'processing',
    },
  ];

  const reportTypes = [
    {
      id: 'analytics',
      name: 'Analytics Reports',
      icon: BarChart2,
      description: 'Statistical analysis and trends',
    },
    {
      id: 'financial',
      name: 'Financial Reports',
      icon: FileBarChart,
      description: 'Revenue and expense tracking',
    },
    {
      id: 'clinical',
      name: 'Clinical Reports',
      icon: FileCheck,
      description: 'Treatment outcomes and patient care',
    },
    {
      id: 'audit',
      name: 'Audit Reports',
      icon: FileClock,
      description: 'Compliance and system usage',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('nav.reports')}</h1>
          <p className="text-gray-500">Generate and manage reports</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" icon={<Calendar size={16} />}>
            Schedule Report
          </Button>
          <Button variant="primary" icon={<FileText size={16} />}>
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportTypes.map((type) => (
          <Card key={type.id}>
            <div className="flex items-start justify-between p-4">
              <div>
                <div className="h-10 w-10 rounded-lg bg-[#0073b9]/10 flex items-center justify-center text-[#0073b9]">
                  <type.icon size={24} />
                </div>
                <h3 className="mt-3 font-medium text-gray-800">{type.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{type.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search reports..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="analytics">Analytics</option>
              <option value="financial">Financial</option>
              <option value="clinical">Clinical</option>
              <option value="audit">Audit</option>
            </select>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <Button variant="outline" icon={<Filter size={16} />}>
              More Filters
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="border rounded-lg hover:border-[#0073b9] transition-colors"
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-gray-800">
                        {report.title}
                      </h3>
                      <Badge
                        variant={
                          report.status === 'completed'
                            ? 'success'
                            : report.status === 'pending'
                            ? 'warning'
                            : 'info'
                        }
                        size="sm"
                      >
                        {report.status}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {report.date}
                      </div>
                      <div className="flex items-center">
                        <User size={14} className="mr-1" />
                        {report.author}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Share2 size={16} />}
                    >
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Download size={16} />}
                    >
                      Download
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<Printer size={16} />}
                    >
                      Print
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Reports;