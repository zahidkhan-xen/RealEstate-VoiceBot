"use client"

import { useState } from 'react'
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
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Link from 'next/link'

interface Lead {
  id: number
  name: string
  email: string
  status: string
  lastContact: string
}

interface Admin {
  id: number
  name: string
  email: string
  role: string
}

const initialLeads: Lead[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "New", lastContact: "2023-05-15" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", status: "Contacted", lastContact: "2023-04-20" },
]

const initialAdmins: Admin[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Super Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Lead Manager" },
]

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [admins, setAdmins] = useState<Admin[]>(initialAdmins)
  const [searchTerm, setSearchTerm] = useState('')
  const [newLead, setNewLead] = useState<Omit<Lead, 'id'>>({ name: '', email: '', status: 'New', lastContact: '' })
  const [newAdmin, setNewAdmin] = useState<Omit<Admin, 'id'>>({ name: '', email: '', role: '' })
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false)

  const handleAddLead = () => {
    const id = leads.length + 1
    setLeads([...leads, { ...newLead, id }])
    setNewLead({ name: '', email: '', status: 'New', lastContact: '' })
    setIsLeadModalOpen(false)
  }

  const handleAddAdmin = () => {
    const id = admins.length + 1
    setAdmins([...admins, { ...newAdmin, id }])
    setNewAdmin({ name: '', email: '', role: '' })
    setIsAdminModalOpen(false)
  }

  const handleDeleteLead = (id: number) => {
    setLeads(leads.filter(lead => lead.id !== id))
  }

  const handleDeleteAdmin = (id: number) => {
    setAdmins(admins.filter(admin => admin.id !== id))
  }

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Lead Management</h2>
        <div className="flex justify-between mb-4">
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button onClick={() => setIsLeadModalOpen(true)}>Add Lead</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Contact</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map(lead => (
              <TableRow key={lead.id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.status}</TableCell>
                <TableCell>{lead.lastContact}</TableCell>
                <TableCell>
                  <Button asChild variant="ghost" className="mr-2">
                    <Link href={`/lead/${lead.id}`}>View</Link>
                  </Button>
                  <Button onClick={() => handleDeleteLead(lead.id)} variant="destructive">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Admin Management</h2>
        <div className="flex justify-end mb-4">
          <Button onClick={() => setIsAdminModalOpen(true)}>Add Admin</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map(admin => (
              <TableRow key={admin.id}>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.role}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteAdmin(admin.id)} variant="destructive">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isLeadModalOpen} onOpenChange={setIsLeadModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
            <DialogDescription>Enter the details of the new lead.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                value={newLead.name}
                onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                
                value={newLead.email}
                onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Status</Label>
              <Select
                value={newLead.status}
                onValueChange={(value) => setNewLead({ ...newLead, status: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastContact" className="text-right">Last Contact</Label>
              <Input
                id="lastContact"
                type="date"
                value={newLead.lastContact}
                onChange={(e) => setNewLead({ ...newLead, lastContact: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddLead}>Add Lead</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAdminModalOpen} onOpenChange={setIsAdminModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Admin</DialogTitle>
            <DialogDescription>Enter the details of the new admin.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="adminName" className="text-right">Name</Label>
              <Input
                id="adminName"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="adminEmail" className="text-right">Email</Label>
              <Input
                id="adminEmail"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="adminRole" className="text-right">Role</Label>
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
            <Button onClick={handleAddAdmin}>Add Admin</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}