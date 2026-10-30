import React, { useState, useEffect } from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Eye, 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Download, 
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Filter,
  Search,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Layout from '@/Layouts/Layout';

 const ApplyForm = () => {
  const { careerForms, flash } = usePage().props;
  const [selectedForm, setSelectedForm] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Form for updating status
  const { data, setData, put, processing, errors, reset } = useForm({
    status: ''
  });

  // Show flash messages
  useEffect(() => {
    if (flash?.success) {
      // You can implement your toast notification here
      console.log('Success:', flash.success);
    }
    if (flash?.error) {
      console.log('Error:', flash.error);
    }
  }, [flash]);

  const getStatusColor = (status) => {
    const colors = {
      'new': 'bg-blue-100 text-blue-800 border-blue-200',
      'reviewed': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'interviewed': 'bg-purple-100 text-purple-800 border-purple-200',
      'rejected': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'new': return <AlertCircle className="w-4 h-4" />;
      case 'reviewed': return <Clock className="w-4 h-4" />;
      case 'interviewed': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleUpdateStatus = (formId, newStatus) => {
    setData('status', newStatus);
    put(route('admin.career-forms.update', formId), {
      onSuccess: () => {
        reset();
      },
      onError: (errors) => {
        console.error('Update failed:', errors);
      }
    });
  };

  const handleDelete = (form) => {
    setFormToDelete(form);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (formToDelete) {
      router.delete(route('admin.career-forms.destroy', formToDelete.id), {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setFormToDelete(null);
        },
        onError: (errors) => {
          console.error('Delete failed:', errors);
        }
      });
    }
  };

  const handleViewDetails = (form) => {
    setSelectedForm(form);
    setViewDialogOpen(true);
  };

  const filteredForms = careerForms.filter(form => {
    const matchesStatus = statusFilter === 'all' || form.status === statusFilter;
    const matchesSearch = form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusCounts = () => {
    const counts = {
      all: careerForms.length,
      new: careerForms.filter(f => f.status === 'new').length,
      reviewed: careerForms.filter(f => f.status === 'reviewed').length,
      interviewed: careerForms.filter(f => f.status === 'interviewed').length,
      rejected: careerForms.filter(f => f.status === 'rejected').length
    };
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <Layout>
      <Head title="Career Forms Management" />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Career Applications
              </h1>
              <p className="text-slate-600 mt-1">Manage job applications and candidate information</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {careerForms.length} Total Applications
              </Badge>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total</p>
                    <p className="text-2xl font-bold text-slate-900">{statusCounts.all}</p>
                  </div>
                  <Users className="w-8 h-8 text-slate-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">New</p>
                    <p className="text-2xl font-bold text-blue-900">{statusCounts.new}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600">Reviewed</p>
                    <p className="text-2xl font-bold text-yellow-900">{statusCounts.reviewed}</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Interviewed</p>
                    <p className="text-2xl font-bold text-purple-900">{statusCounts.interviewed}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-600">Rejected</p>
                    <p className="text-2xl font-bold text-red-900">{statusCounts.rejected}</p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-500" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="interviewed">Interviewed</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applications Grid */}
          <div className="grid gap-6">
            {filteredForms.length === 0 ? (
              <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-slate-600">No applications found</p>
                  <p className="text-slate-500 mt-1">Try adjusting your search or filter criteria</p>
                </CardContent>
              </Card>
            ) : (
              filteredForms.map((form) => (
                <Card key={form.id} className="border-0 shadow-md bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-slate-900">{form.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                              <div className="flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                {form.email}
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                {form.contact_number}
                              </div>
                              <div className="flex items-center gap-1">
                                <Briefcase className="w-4 h-4" />
                                {form.year_of_experience} years exp.
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={cn("flex items-center gap-1", getStatusColor(form.status))}>
                              {getStatusIcon(form.status)}
                              {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-1 text-sm text-slate-600">
                              <MapPin className="w-4 h-4" />
                              {form.address}
                            </div>
                            {form.project_link && (
                              <div className="flex items-center gap-1 text-sm">
                                <ExternalLink className="w-4 h-4" />
                                <a 
                                  href={form.project_link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 underline"
                                >
                                  View Portfolio
                                </a>
                              </div>
                            )}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {Array.isArray(form.skills) ? form.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              )) : null}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(form)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            
                            <Select 
                              value={form.status} 
                              onValueChange={(value) => handleUpdateStatus(form.id, value)}
                              disabled={processing}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="reviewed">Reviewed</SelectItem>
                                <SelectItem value="interviewed">Interviewed</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewDetails(form)}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <a 
                                    href={`/${form.resume}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Resume
                                  </a>
                                </DropdownMenuItem>
                                <Separator className="my-1" />
                                <DropdownMenuItem 
                                  onClick={() => handleDelete(form)}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* View Details Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
              <DialogDescription>
                Complete information about the candidate
              </DialogDescription>
            </DialogHeader>
            {selectedForm && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-700">Full Name</Label>
                    <p className="text-slate-900 mt-1">{selectedForm.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-700">Email</Label>
                    <p className="text-slate-900 mt-1">{selectedForm.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-700">Phone</Label>
                    <p className="text-slate-900 mt-1">{selectedForm.contact_number}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-700">Experience</Label>
                    <p className="text-slate-900 mt-1">{selectedForm.year_of_experience} years</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-slate-700">Address</Label>
                  <p className="text-slate-900 mt-1">{selectedForm.address}</p>
                </div>

                {selectedForm.project_link && (
                  <div>
                    <Label className="text-sm font-medium text-slate-700">Portfolio/Project Link</Label>
                    <p className="text-slate-900 mt-1">
                      <a 
                        href={selectedForm.project_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                      >
                        {selectedForm.project_link}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </p>
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium text-slate-700">Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Array.isArray(selectedForm.skills) ? selectedForm.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    )) : null}
                  </div>
                </div>

                {selectedForm.message && (
                  <div>
                    <Label className="text-sm font-medium text-slate-700">Message</Label>
                    <p className="text-slate-900 mt-1 whitespace-pre-wrap">{selectedForm.message}</p>
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium text-slate-700">Resume</Label>
                  <div className="mt-2">
                    <Button asChild variant="outline">
                      <a 
                        href={`/${selectedForm.resume}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download Resume
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <Label className="text-sm font-medium text-slate-700">Application Date</Label>
                    <p className="text-slate-900 mt-1">
                      {new Date(selectedForm.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-700">Current Status</Label>
                    <div className="mt-1">
                      <Badge className={cn("flex items-center gap-1", getStatusColor(selectedForm.status))}>
                        {getStatusIcon(selectedForm.status)}
                        {selectedForm.status.charAt(0).toUpperCase() + selectedForm.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the career application
                for <strong>{formToDelete?.name}</strong> and remove all associated data including the resume file.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete Application
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default ApplyForm;