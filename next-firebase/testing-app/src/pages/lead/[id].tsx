"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BarChart, Settings, PlusCircle, Search, Edit, Trash2, UserPlus, SortAsc, SortDesc } from "lucide-react"

// Define types
type LeadStatus = "New" | "Contacted" | "Qualified" | "Proposal" | "Negotiation"

interface Lead {
  id: number
  name: string
  email: string
  status: LeadStatus
  lastContact: string
  notes: string
}

interface Admin {
  id: number
  name: string
  email: string
  role: string
}

interface ActivityLogEntry {
  id: number
  action: string
  user: string
  timestamp: string
}

interface SortConfig {
  key: keyof Lead | null
  direction: 'ascending' | 'descending'
}

// Mock data
const initialLeads: Lead[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "New", lastContact: "2023-05-15", notes: "Interested in our premium package" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", status: "Contacted", lastContact: "2023-04-20", notes: "Follow up next week" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", status: "Qualified", lastContact: "2023-05-10", notes: "Scheduled demo for next month" },
  { id: 4, name: "Diana Ross", email: "diana@example.com", status: "Proposal", lastContact: "2023-05-01", notes: "Sent proposal, awaiting response" },
  { id: 5, name: "Edward Norton", email: "edward@example.com", status: "Negotiation", lastContact: "2023-05-12", notes: "Discussing contract terms" },
]

const initialAdmins: Admin[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Super Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Lead Manager" },
]

const initialActivityLog: ActivityLogEntry[] = [
  { id: 1, action: "Added new lead", user: "John Doe", timestamp: "2023-05-15 09:30:00" },
  { id: 2, action: "Updated lead status", user: "Jane Smith", timestamp: "2023-05-14 14:45:00" },
]

export default function Component() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [admins, setAdmins] = useState<Admin[]>(initialAdmins)
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>(initialActivityLog)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [newLead, setNewLead] = useState<Omit<Lead, 'id' | 'lastContact'>>({ name: "", email: "", status: "New", notes: "" })
  const [newAdmin, setNewAdmin] = useState<Omit<Admin, 'id'>>({ name: "", email: "", role: "" })
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'ascending' })
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
    }
    return 0
  })

  const handleSort = (key: keyof Lead) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const handleAddLead = () => {
    if (!newLead.name || !newLead.email) {
      alert("Name and Email are required fields")
      return
    }
    const newLeadWithId: Lead = { 
      ...newLead, 
      id: leads.length + 1, 
      lastContact: new Date().toISOString().split('T')[0] 
    }
    setLeads([...leads, newLeadWithId])
    setNewLead({ name: "", email: "", status: "New", notes: "" })
    addActivityLog(`Added new lead: ${newLead.name}`)
  }

  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead)
  }

  const handleUpdateLead = () => {
    if (!editingLead || !editingLead.name || !editingLead.email) {
      alert("Name and Email are required fields")
      return
    }
    setLeads(leads.map(lead => lead.id === editingLead.id ? editingLead : lead))
    setEditingLead(null)
    addActivityLog(`Updated lead: ${editingLead.name}`)
  }

  const handleDeleteLead = (id: number) => {
    const leadToDelete = leads.find(lead => lead.id === id)
    if (leadToDelete) {
      setLeads(leads.filter(lead => lead.id !== id))
      addActivityLog(`Deleted lead: ${leadToDelete.name}`)
    }
  }

  const handleAddAdmin = () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.role) {
      alert("All fields are required for adding an admin")
      return
    }
    setAdmins([...admins, { ...newAdmin, id: admins.length + 1 }])
    setNewAdmin({ name: "", email: "", role: "" })
    addActivityLog(`Added new admin: ${newAdmin.name}`)
  }

  const addActivityLog = (action: string) => {
    const newLog: ActivityLogEntry = {
      id: activityLog.length + 1,
      action,
      user: "Current User", // In a real app, this would be the logged-in user
      timestamp: new Date().toLocaleString()
    }
    setActivityLog([newLog, ...activityLog])
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-5">
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            <Users className="inline-block mr-2" size={20} />
            Leads
          </a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            <BarChart className="inline-block mr-2" size={20} />
            Analytics
          </a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            <Settings className="inline-block mr-2" size={20} />
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Tabs defaultValue="leads">
          <TabsList>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>
          <TabsContent value="leads">
            <h1 className="text-2xl font-semibold mb-4">Lead Management</h1>

            {/* Search and Add Lead */}
            <div className="flex justify-between mb-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search leads"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Lead
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Lead</DialogTitle>
                    <DialogDescription>Enter the details of the new lead.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newLead.name}
                        onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        value={newLead.email}
                        onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="status" className="text-right">
                        Status
                      </Label>
                      <Select
                        value={newLead.status}
                        onValueChange={(value: LeadStatus) => setNewLead({ ...newLead, status: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="New">New</SelectItem>
                          <SelectItem value="Contacted">Contacted</SelectItem>
                          <SelectItem value="Qualified">Qualified</SelectItem>
                          <SelectItem value="Proposal">Proposal</SelectItem>
                          <SelectItem value="Negotiation">Negotiation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="notes" className="text-right">
                        Notes
                      </Label>
                      <Textarea
                        id="notes"
                        value={newLead.notes}
                        onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddLead}>Add Lead</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Lead Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                      Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? <SortAsc className="inline h-4 w-4" /> : <SortDesc className="inline h-4 w-4" />)}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('email')}>
                      Email {sortConfig.key === 'email' && (sortConfig.direction === 'ascending' ? <SortAsc className="inline h-4 w-4" /> : <SortDesc className="inline h-4 w-4" />)}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                      Status {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? <SortAsc className="inline h-4 w-4" /> : <SortDesc className="inline h-4 w-4" />)}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('lastContact')}>
                      Last Contact {sortConfig.key === 'lastContact' && (sortConfig.direction === 'ascending' ? <SortAsc className="inline h-4 w-4" /> : <SortDesc className="inline h-4 w-4" />)}
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.status}</TableCell>
                      <TableCell>{lead.lastContact}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => handleEditLead(lead)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Lead</DialogTitle>
                                
                                <DialogDescription>Make changes to the lead&apos;s information.</DialogDescription>
                              </DialogHeader>
                              {editingLead && (
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-name" className="text-right">
                                      Name
                                    </Label>
                                    <Input
                                      id="edit-name"
                                      value={editingLead.name}
                                      onChange={(e) => setEditingLead({ ...editingLead, name: e.target.value })}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-email" className="text-right">
                                      Email
                                    </Label>
                                    <Input
                                      id="edit-email"
                                      value={editingLead.email}
                                      onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-status" className="text-right">
                                      Status
                                    </Label>
                                    <Select
                                      value={editingLead.status}
                                      onValueChange={(value: LeadStatus) => setEditingLead({ ...editingLead, status: value })}
                                    >
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select a status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="New">New</SelectItem>
                                        <SelectItem value="Contacted">Contacted</SelectItem>
                                        <SelectItem value="Qualified">Qualified</SelectItem>
                                        <SelectItem value="Proposal">Proposal</SelectItem>
                                        <SelectItem value="Negotiation">Negotiation</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-notes" className="text-right">
                                      Notes
                                    </Label>
                                    <Textarea
                                      id="edit-notes"
                                      value={editingLead.notes}
                                      onChange={(e) => setEditingLead({ ...editingLead, notes: e.target.value })}
                                      className="col-span-3"
                                    />
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <Button type="submit" onClick={handleUpdateLead}>Save Changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteLead(lead.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setSelectedLead(lead)}>
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Detailed Lead View */}
            {selectedLead && (
              <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{selectedLead.name}</DialogTitle>
                    <DialogDescription>Detailed lead information</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right font-bold">Email:</Label>
                      <span className="col-span-3">{selectedLead.email}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right font-bold">Status:</Label>
                      <span className="col-span-3">{selectedLead.status}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right font-bold">Last Contact:</Label>
                      <span className="col-span-3">{selectedLead.lastContact}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right font-bold">Notes:</Label>
                      <span className="col-span-3">{selectedLead.notes}</span>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>

          <TabsContent value="admins">
            <h2 className="text-xl font-semibold mb-4">Admin Management</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell className="font-medium">{admin.name}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell>{admin.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Add Admin */}
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" /> Add Admin
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Admin</DialogTitle>
                  <DialogDescription>Enter the details of the new admin.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="admin-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="admin-name"
                      value={newAdmin.name}
                      onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="admin-email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="admin-email"
                      value={newAdmin.email}
                      onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="admin-role" className="text-right">
                      Role
                    </Label>
                    <Select
                      value={newAdmin.role}
                      onValueChange={(value) => setNewAdmin({ ...newAdmin, role: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Super Admin">Super Admin</SelectItem>
                        <SelectItem value="Lead Manager">Lead Manager</SelectItem>
                        <SelectItem value="Sales Rep">Sales Rep</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddAdmin}>Add Admin</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="activity">
            <h2 className="text-xl font-semibold mb-4">Activity Log</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activityLog.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}