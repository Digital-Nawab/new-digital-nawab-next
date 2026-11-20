'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  FileText,
  Eye,
  DollarSign,
  Search,
  Bell,
  Settings,
  Plus,
  Edit3,
  Trash2,
  MoreHorizontal,
  Activity,
  Download,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [pageFilter, setPageFilter] = useState('All');
  const [hoveredTrafficIndex, setHoveredTrafficIndex] = useState(null);
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);

  // Visitors data from Laravel Inertia Admin/Dashboard.jsx
  const visitorsData = [
    { name: 'Mon', visitors: 1200, pageViews: 2400 },
    { name: 'Tue', visitors: 1900, pageViews: 3200 },
    { name: 'Wed', visitors: 800, pageViews: 1600 },
    { name: 'Thu', visitors: 1600, pageViews: 2800 },
    { name: 'Fri', visitors: 2200, pageViews: 3600 },
    { name: 'Sat', visitors: 1400, pageViews: 2200 },
    { name: 'Sun', visitors: 1000, pageViews: 1800 },
  ];

  // Revenue data from Laravel Inertia Admin/Dashboard.jsx
  const revenueData = [
    { name: 'Jan', revenue: 45000 },
    { name: 'Feb', revenue: 52000 },
    { name: 'Mar', revenue: 48000 },
    { name: 'Apr', revenue: 61000 },
    { name: 'May', revenue: 55000 },
    { name: 'Jun', revenue: 67000 },
  ];

  // Device data from Laravel Inertia Admin/Dashboard.jsx
  const deviceData = [
    { name: 'Desktop', value: 45, color: '#3B82F6' },
    { name: 'Mobile', value: 35, color: '#10B981' },
    { name: 'Tablet', value: 20, color: '#F59E0B' },
  ];

  // Recent pages from Laravel Inertia Admin/Dashboard.jsx
  const recentPages = [
    { id: 1, title: 'Home Page', lastModified: '2 hours ago', status: 'Published' },
    { id: 2, title: 'About Us', lastModified: '1 day ago', status: 'Draft' },
    { id: 3, title: 'Services', lastModified: '3 days ago', status: 'Published' },
    { id: 4, title: 'Contact', lastModified: '1 week ago', status: 'Published' },
  ];

  const notifications = [
    { id: 1, message: 'New user registration', time: '2 min ago', type: 'info' },
    { id: 2, message: 'Page content updated', time: '15 min ago', type: 'success' },
    { id: 3, message: 'Server maintenance scheduled', time: '1 hour ago', type: 'warning' },
  ];

  const filteredPages = recentPages.filter((page) => {
    if (pageFilter === 'All') return true;
    return page.status === pageFilter;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Subheader */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Welcome back, Admin. Here&apos;s what&apos;s happening with your website.
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
            title="Notifications"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>

          <button
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
            title="Settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Row 1: 4 Quick Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">12,543</p>
              </div>
            </div>
            <div className="text-sm font-medium text-green-600">+12.5%</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <Eye size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Page Views</p>
                <p className="text-2xl font-bold text-gray-900">45,210</p>
              </div>
            </div>
            <div className="text-sm font-medium text-green-600">+8.3%</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Pages</p>
                <p className="text-2xl font-bold text-gray-900">234</p>
              </div>
            </div>
            <div className="text-sm font-medium text-green-600">+5</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <DollarSign size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$67,340</p>
              </div>
            </div>
            <div className="text-sm font-medium text-green-600">+15.2%</div>
          </div>
        </div>
      </div>

      {/* Row 2: Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Website Traffic Area Chart */}
        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Website Traffic</h3>
            <div className="flex space-x-2">
              {['7d', '30d', '90d'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedTimeframe(period)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors cursor-pointer ${
                    selectedTimeframe === period
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Area Chart */}
          <div className="relative h-64 w-full">
            <svg
              viewBox="0 0 500 220"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="40" y1="20" x2="490" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="40" y1="65" x2="490" y2="65" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="40" y1="110" x2="490" y2="110" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="40" y1="155" x2="490" y2="155" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="40" y1="190" x2="490" y2="190" stroke="#e2e8f0" />

              {/* Y-Axis Labels */}
              <text x="32" y="24" textAnchor="end" className="text-[10px] fill-gray-400 font-mono">6000</text>
              <text x="32" y="69" textAnchor="end" className="text-[10px] fill-gray-400 font-mono">4500</text>
              <text x="32" y="114" textAnchor="end" className="text-[10px] fill-gray-400 font-mono">3000</text>
              <text x="32" y="159" textAnchor="end" className="text-[10px] fill-gray-400 font-mono">1500</text>
              <text x="32" y="193" textAnchor="end" className="text-[10px] fill-gray-400 font-mono">0</text>

              {/* PageViews Area (Green curve) */}
              {/* Data: 2400, 3200, 1600, 2800, 3600, 2200, 1800 -> mapped to Y: 190 - (val/6000)*170 */}
              <path
                d="M 60 122 Q 130 99 130 99 T 200 144 T 275 110 T 350 88 T 420 127 T 480 139 L 480 190 L 60 190 Z"
                fill="url(#greenGradient)"
              />
              <path
                d="M 60 122 Q 130 99 130 99 T 200 144 T 275 110 T 350 88 T 420 127 T 480 139"
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
              />

              {/* Visitors Area (Blue curve) */}
              {/* Data: 1200, 1900, 800, 1600, 2200, 1400, 1000 */}
              <path
                d="M 60 156 Q 130 136 130 136 T 200 167 T 275 144 T 350 127 T 420 150 T 480 161 L 480 190 L 60 190 Z"
                fill="url(#blueGradient)"
              />
              <path
                d="M 60 156 Q 130 136 130 136 T 200 167 T 275 144 T 350 127 T 420 150 T 480 161"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2.5"
              />

              {/* Data points & X Labels */}
              {visitorsData.map((d, i) => {
                const x = 60 + i * 70;
                return (
                  <g
                    key={d.name}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredTrafficIndex(i)}
                    onMouseLeave={() => setHoveredTrafficIndex(null)}
                  >
                    <text
                      x={x}
                      y="208"
                      textAnchor="middle"
                      className="text-[11px] fill-gray-500 font-medium"
                    >
                      {d.name}
                    </text>
                    <circle cx={x} cy={190 - (d.pageViews / 6000) * 170} r={hoveredTrafficIndex === i ? 5 : 3} fill="#10B981" />
                    <circle cx={x} cy={190 - (d.visitors / 6000) * 170} r={hoveredTrafficIndex === i ? 5 : 3} fill="#3B82F6" />
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip */}
            {hoveredTrafficIndex !== null && (
              <div
                className="absolute bg-gray-900 text-white text-xs rounded-lg py-1.5 px-3 shadow-lg pointer-events-none -translate-x-1/2 -top-2"
                style={{ left: `${12 + hoveredTrafficIndex * 14}%` }}
              >
                <div className="font-semibold text-gray-200">{visitorsData[hoveredTrafficIndex].name}</div>
                <div className="text-emerald-400">Page Views: {visitorsData[hoveredTrafficIndex].pageViews}</div>
                <div className="text-blue-400">Visitors: {visitorsData[hoveredTrafficIndex].visitors}</div>
              </div>
            )}
          </div>
        </div>

        {/* Revenue Overview Bar Chart */}
        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>

          <div className="relative h-64 w-full">
            <svg
              viewBox="0 0 500 220"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              {/* Grid Lines */}
              <line x1="50" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="50" y1="62" x2="480" y2="62" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="50" y1="105" x2="480" y2="105" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="50" y1="148" x2="480" y2="148" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="50" y1="190" x2="480" y2="190" stroke="#e2e8f0" />

              {/* Y-Axis Labels */}
              <text x="42" y="24" textAnchor="end" className="text-[10px] fill-gray-400 font-mono">80000</text>
              <text x="42" y="66" textAnchor="end" className="text-[10px] fill-gray-400 font-mono">60000</text>
              <text x="42" y="109" textAnchor="end" className="text-[10px] fill-gray-400 font-mono">40000</text>
              <text x="42" y="152" textAnchor="end" className="text-[10px] fill-gray-400 font-mono">20000</text>
              <text x="42" y="193" textAnchor="end" className="text-[10px] fill-gray-400 font-mono">0</text>

              {/* Bars */}
              {revenueData.map((d, i) => {
                const x = 75 + i * 68;
                const height = (d.revenue / 80000) * 170;
                const y = 190 - height;
                return (
                  <g
                    key={d.name}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredBarIndex(i)}
                    onMouseLeave={() => setHoveredBarIndex(null)}
                  >
                    <rect
                      x={x}
                      y={y}
                      width="42"
                      height={height}
                      rx="4"
                      fill={hoveredBarIndex === i ? '#2563EB' : '#3B82F6'}
                      className="transition-colors duration-150"
                    />
                    <text
                      x={x + 21}
                      y="208"
                      textAnchor="middle"
                      className="text-[11px] fill-gray-500 font-medium"
                    >
                      {d.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Bar Tooltip */}
            {hoveredBarIndex !== null && (
              <div
                className="absolute bg-gray-900 text-white text-xs rounded-lg py-1.5 px-3 shadow-lg pointer-events-none -translate-x-1/2 -top-2"
                style={{ left: `${20 + hoveredBarIndex * 13.5}%` }}
              >
                <div className="font-semibold text-gray-200">{revenueData[hoveredBarIndex].name}</div>
                <div className="text-blue-400 font-bold">${revenueData[hoveredBarIndex].revenue.toLocaleString()} Revenue</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 3: Lower Section (Recent Pages & Device Analytics) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Pages (2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-xs border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Pages</h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                {['All', 'Published', 'Draft'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setPageFilter(tab)}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors cursor-pointer ${
                      pageFilter === tab
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <Link
                href="/admin/blogs"
                className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-xs"
              >
                <Plus size={16} />
                <span>Add Page</span>
              </Link>
            </div>

            <div className="space-y-3">
              {filteredPages.map((page) => (
                <div
                  key={page.id}
                  className="flex items-center justify-between p-3.5 bg-gray-50/80 rounded-xl border border-gray-100"
                >
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{page.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Modified {page.lastModified}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                        page.status === 'Published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {page.status}
                    </span>

                    <div className="flex space-x-1 text-gray-400">
                      <Link
                        href="/admin/blogs"
                        className="p-1 hover:text-gray-700 hover:bg-gray-200 rounded"
                        title="Edit"
                      >
                        <Edit3 size={15} />
                      </Link>
                      <button
                        className="p-1 hover:text-red-600 hover:bg-gray-200 rounded cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                      <button
                        className="p-1 hover:text-gray-700 hover:bg-gray-200 rounded cursor-pointer"
                        title="More"
                      >
                        <MoreHorizontal size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Device Analytics & Recent Activity (1 Column) */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Analytics</h3>

            {/* SVG Donut Chart */}
            <div className="relative h-44 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-40 h-40 -rotate-90">
                {/* Desktop 45% -> 45 of 100 = 127.23 circumference */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="transparent"
                  stroke="#3B82F6"
                  strokeWidth="14"
                  strokeDasharray="99 220"
                  strokeDashoffset="0"
                />
                {/* Mobile 35% -> 35 of 100 */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="transparent"
                  stroke="#10B981"
                  strokeWidth="14"
                  strokeDasharray="77 220"
                  strokeDashoffset="-99"
                />
                {/* Tablet 20% -> 20 of 100 */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="transparent"
                  stroke="#F59E0B"
                  strokeWidth="14"
                  strokeDasharray="44 220"
                  strokeDashoffset="-176"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-2xl font-bold text-gray-900">45k</span>
                <span className="block text-[10px] text-gray-400 uppercase tracking-wider">Visits</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              {deviceData.map((device) => (
                <div key={device.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: device.color }}
                    />
                    <span className="text-gray-600">{device.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{device.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start space-x-3 p-3 bg-gray-50/80 rounded-lg"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      notification.type === 'info'
                        ? 'bg-blue-500'
                        : notification.type === 'success'
                        ? 'bg-green-500'
                        : 'bg-yellow-500'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{notification.time}</p>
                  </div>
                </div>
              ))}
              <Link
                href="/admin/enquiries"
                className="block text-center text-sm font-medium text-blue-600 hover:text-blue-700 py-1"
              >
                View all activities →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Quick Actions */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/blogs"
            className="flex flex-col items-center p-4 bg-blue-50/60 hover:bg-blue-100/70 rounded-xl transition-colors group"
          >
            <Plus className="text-blue-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
            <span className="text-sm font-medium text-blue-600">Add Content</span>
          </Link>

          <Link
            href="/admin/users"
            className="flex flex-col items-center p-4 bg-green-50/60 hover:bg-green-100/70 rounded-xl transition-colors group"
          >
            <Users className="text-green-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
            <span className="text-sm font-medium text-green-600">Manage Users</span>
          </Link>

          <Link
            href="/admin/pricing-sections"
            className="flex flex-col items-center p-4 bg-purple-50/60 hover:bg-purple-100/70 rounded-xl transition-colors group"
          >
            <Activity className="text-purple-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
            <span className="text-sm font-medium text-purple-600">Pricing Sections</span>
          </Link>

          <Link
            href="/admin/enquiries"
            className="flex flex-col items-center p-4 bg-orange-50/60 hover:bg-orange-100/70 rounded-xl transition-colors group"
          >
            <Download className="text-orange-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
            <span className="text-sm font-medium text-orange-600">Leads & Enquiries</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
